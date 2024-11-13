import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { netid } = req.query;
    try {
      const availability = await prisma.availability.findMany({
        where: { netid },
        include: { task: true }
      });

      res.status(200).json(availability);
    } catch (error) {
      res.status(500).json({ error: 'Database query failed', details: error.message });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ message: 'Only GET requests are allowed' });
  }
}