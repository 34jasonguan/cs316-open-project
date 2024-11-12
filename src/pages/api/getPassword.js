// pages/api/getPassword.js
import prisma from '../../../lib/prisma'; 

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { netID } = req.query;

    try {
      const passwordTrue = await prisma.password.findUnique({
        where: {
          netid: netID,
        },
        select: {
          password: true,
        },
      });

      if (passwordTrue) {
        res.status(200).json(passwordTrue);
      } else {
        res.status(404).json({ message: 'No password found for the netID' });
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