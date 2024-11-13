import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { id, taskId, date, startTime, endTime } = req.body;
    try {
      const updatedAvailability = await prisma.availability.update({
        where: { id: parseInt(id) },
        data: {
          taskId,
          date: new Date(date),
          startTime: new Date(startTime),
          endTime: new Date(endTime)
        }
      });

      res.status(200).json(updatedAvailability);
    } catch (error) {
      res.status(500).json({ error: 'Database operation failed', details: error.message });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ message: 'Only PUT requests are allowed' });
  }
}