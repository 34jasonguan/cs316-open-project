// pages/api/addAvailability.js
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { netid, dates } = req.body;

    try {
      const data = dates.map((date) => ({
        netid,
        available_date: new Date(date),
      }));

      await prisma.availability.createMany({
        data,
      });

      res.status(200).json({ message: 'Dates added successfully' });
    } catch (error) {
      console.error('Database error:', error.message);
      res.status(500).json({ error: 'Internal server error: ' + error.message });
    }
  } else {
    res.status(405).json({ message: 'Only POST requests are allowed' });
  }
}