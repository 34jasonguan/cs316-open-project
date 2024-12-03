// pages/api/getUserProfile.js
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const { netid } = req.query;

  try {
    const user = await prisma.users.findUnique({ where: { netid } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let relatedInfo = {};

    const studentRa = await prisma.hasra.findUnique({ where: { studentnetid: netid } });
    if (studentRa) {
      relatedInfo.ra = {
        firstname: studentRa.rafirstname,
        lastname: studentRa.ralastname,
        netid: studentRa.ranetid,
      };
    }

    const raStudents = await prisma.hasra.findMany({ where: { ranetid: netid } });
    if (raStudents.length > 0) {
      relatedInfo.students = raStudents.map((student) => ({
        firstname: student.studentfirstname,
        lastname: student.studentlastname,
        netid: student.studentnetid,
      }));
    }

    const rcRas = await prisma.hasrc.findMany({ where: { rcnetid: netid } });
    if (rcRas.length > 0) {
      relatedInfo.ras = rcRas.map((ra) => ({
        firstname: ra.rafirstname,
        lastname: ra.ralastname,
        netid: ra.ranetid,
      }));
    }

    res.status(200).json({ ...user, relatedInfo });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}