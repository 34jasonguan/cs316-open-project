// /pages/api/getRAs.js
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const { rcnetid } = req.query;
  try {
    const RAs = await prisma.hasrc.findMany({
      where: { rcnetid },
      select: {
        rafirstname: true,
        ralastname: true,
        ranetid: true,
      }
    });
    res.status(200).json(RAs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch RAs' });
  }
}