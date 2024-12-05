// pages/api/submitAvailability.js
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userID, availabilities } = req.body;

    try {
      console.log('Received data:', { userID, availabilities });

      const eventIds = Object.keys(availabilities).map((id) => parseInt(id, 10));
      console.log('Parsed event IDs:', eventIds);
      const events = await prisma.events.findMany({
        where: {
          id: { in: eventIds },
        },
        select: {
          name: true,
        },
      });

      const eventNames = events.map((event) => event.name);
      console.log('Event names:', eventNames);

      const allEventsWithNames = await prisma.events.findMany({
        where: {
          name: { in: eventNames },
        },
        select: {
          id: true,
        },
      });

      const eventIdsToDelete = allEventsWithNames.map((event) => event.id);
      console.log('Event IDs to delete:', eventIdsToDelete);

      await prisma.$transaction(async (tx) => {
        console.log('Starting transaction');
        const deleteResult = await tx.availability.deleteMany({
          where: {
            user_id: userID,
            event_id: { in: eventIdsToDelete },
          },
        });
        console.log('Deleted existing availabilities:', deleteResult);

        for (const [eventIdStr, isAvailable] of Object.entries(availabilities)) {
          const eventId = parseInt(eventIdStr, 10);
          console.log(`Processing event ID ${eventId}, isAvailable: ${isAvailable}`);

          if (isAvailable) {
            const createResult = await tx.availability.create({
              data: {
                user_id: userID,
                event_id: eventId,
                is_available: true,
              },
            });
            console.log('Created availability:', createResult);
          }
        }

        console.log('Transaction completed successfully');
      });

      res.status(201).json({ message: 'Availability submitted successfully' });
    } catch (error) {
      console.error('Error submitting availability:', error);
      res.status(500).json({
        error: 'Failed to submit availability',
        details: error.message,
        stack: error.stack,
      });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
