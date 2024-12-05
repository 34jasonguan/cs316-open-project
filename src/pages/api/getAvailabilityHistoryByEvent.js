import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { eventName } = req.query;

    if (!eventName) {
      return res.status(400).json({ error: 'Event name is required' });
    }

    try {
      const availabilityData = await prisma.availability.findMany({
        where: {
          event: {
            name: eventName,
          },
        },
        include: {
          event: true,
        },
      });

      const results = availabilityData.map((availability) => ({
        user: availability.user_id, 
        event: availability.event.name,
        date: availability.event.date.toISOString().split('T')[0],
        isAvailable: availability.is_available,
      }));

      return res.status(200).json(results);
    } catch (error) {
      console.error('Error fetching availability:', error);
      return res.status(500).json({ error: 'Failed to fetch availability' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
