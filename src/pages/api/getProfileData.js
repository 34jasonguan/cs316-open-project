//pages/api/getProfileData.js
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const { netid, userClass } = req.query;

  try {
    if (userClass === 'student') {
      const data = await prisma.hasra.findUnique({
        where: { studentnetid: netid },
        select: {
          ranetid: true,
          ralastname: true,
          rafirstname: true,
        },
      });

      return res.status(200).json({ ra: data });
    }

    if (userClass === 'RA') {
      const rcInfo = await prisma.hasrc.findUnique({
        where: { ranetid: netid },
        select: {
          rcnetid: true,
          rclastname: true,
          rcfirstname: true,
        },
      });

      const students = await prisma.hasra.findMany({
        where: { ranetid: netid },
        select: {
          studentnetid: true,
          studentlastname: true,
          studentfirstname: true,
        },
      });

      return res.status(200).json({ rc: rcInfo, students });
    }

    if (userClass === 'RC') {
      const ras = await prisma.hasrc.findMany({
        where: { rcnetid: netid },
        select: {
          ranetid: true,
          ralastname: true,
          rafirstname: true,
        },
      });

      return res.status(200).json({ ras });
    }

    return res.status(400).json({ message: 'Invalid user class.' });
  } catch (error) {
    console.error('Error fetching profile data:', error);
    return res.status(500).json({ error: 'An error occurred.' });
  }
}