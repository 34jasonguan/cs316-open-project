import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { userID } = req.query;

    if (!userID) {
      return res.status(400).json({ error: 'userID is required' });
    }

    try {
      const user = await prisma.user.findUnique({
        where: { netid: userID },
        select: { class: true },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const hasStaffAccess = user.class === 'RC' || user.class === 'ADMIN';

      res.status(200).json({ hasStaffAccess });
    } catch (error) {
      console.error('Database query failed:', error);
      res.status(500).json({ error: 'Database query failed', details: error.message });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

