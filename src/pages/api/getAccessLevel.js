// pages/api/getAccessLevel.js
import prisma from '../../../lib/prisma'; 

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { netID } = req.query;

    try {
      const userClass = await prisma.users.findUnique({
        where: {
          netid: netID,
        },
        select: {
          class: true,
        },
      });

      if (userClass) {
        res.status(200).json(userClass); 
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Database query failed', details: error });
    } finally {
      await prisma.$disconnect(); 
    }
  } else {
    res.status(405).json({ message: 'Only GET requests are allowed' });
  }
}