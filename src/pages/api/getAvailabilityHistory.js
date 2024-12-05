// pages/api/getAvailabilityHistory.js
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { userID } = req.query;

    try {
      const availabilities = await prisma.availability.findMany({
        where: {
          user_id: userID,
        },
        include: {
          event: true, 
        },
      });

      if (availabilities.length === 0) {
        return res.status(200).json({ history: [] }); 
      }

      const history = availabilities.reduce((acc, availability) => {
        const eventName = availability.event.name;
        const eventDate = availability.event.date.toISOString().split('T')[0];
        const isAvailable = availability.is_available;

        if (!acc[eventName]) {
          acc[eventName] = [];
        }

        acc[eventName].push({
          date: eventDate,
          isAvailable,
        });

        return acc;
      }, {});

      res.status(200).json({ history });
    } catch (error) {
      console.error('Error fetching availability history:', error);
      res.status(500).json({ error: 'Failed to fetch availability history', details: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
