import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { netid, taskId, date, startTime, endTime } = req.body;
    try {
      const availability = await prisma.availability.create({
        data: {
          netid,
          taskId,
          date: new Date(date),
          startTime: new Date(startTime),
          endTime: new Date(endTime)
        }
      });

      res.status(201).json(availability);
    } catch (error) {
      res.status(500).json({ error: 'Database operation failed', details: error.message });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ message: 'Only POST requests are allowed' });
  }
}