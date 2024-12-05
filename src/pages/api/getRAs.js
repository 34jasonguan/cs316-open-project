import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { rcNetID } = req.query;

    if (!rcNetID) {
      return res.status(400).json({ error: 'rcNetID is required' });
    }

    try {
      const RAs = await prisma.hasRC.findMany({
        where: { rcNetID },
        select: {
          raNetID: true,
          raLastName: true,
          raFirstName: true,
        },
      });

      if (RAs.length > 0) {
        res.status(200).json(RAs); 
      } else {
        res.status(404).json({ message: 'No RAs found for this RC' });
      }
    } catch (error) {
      console.error('Database query failed:', error);
      res.status(500).json({ error: 'Database query failed', details: error.message });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: 'Only GET requests are allowed' });
  }
}
