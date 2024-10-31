// pages/api/getResidents.js
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const { ranetid } = req.query;
  try {
    const residents = await prisma.hasra.findMany({
      where: { ranetid },
      select: {
        studentfirstname: true,
        studentlastname: true,
        studentnetid: true,
      }
    });
    res.status(200).json(residents);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch Residents' });
  }
}