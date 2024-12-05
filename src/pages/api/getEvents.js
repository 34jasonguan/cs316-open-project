// pages/api/getEvents.js
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const eventsData = await prisma.events.findMany({
        select: {
          id: true,
          name: true,
          date: true,
        },
        orderBy: {
          date: 'asc',
        },
      });

      const events = eventsData.map((event) => ({
        ...event,
        date: event.date.toISOString(),
      }));

      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ error: 'Database query failed', details: error.message });
    }
  } else {
    res.status(405).json({ message: 'Only GET requests are allowed' });
  }
}
