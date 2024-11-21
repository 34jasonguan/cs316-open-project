// pages/api/getUserDorm.js
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { userID } = req.query;

    if (!userID) {
      return res.status(400).json({ error: 'Missing userID in query parameters' });
    }

    try {
      const user = await prisma.users.findUnique({
        where: {
          netid: userID,
        },
        select: {
          dorm: true,
        },
      });

      if (user && user.dorm) {
        res.status(200).json({ dorm: user.dorm });
      } else {
        res.status(404).json({ error: 'User not found or dorm not set' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Database query failed', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Only GET requests are allowed' });
  }
}