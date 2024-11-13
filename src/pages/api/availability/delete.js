import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.query;
    try {
      await prisma.availability.delete({
        where: { id: parseInt(id) }
      });

      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Database operation failed', details: error.message });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ message: 'Only DELETE requests are allowed' });
  }
}