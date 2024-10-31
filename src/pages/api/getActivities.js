// pages/api/getActivities.js
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const { building_name } = req.query; 
  try {
    const activities = await prisma.activities.findMany({
      where: {
        building_name: building_name,
      },
      select: {
        name: true,
        date: true,
        time: true,
        room_number: true,
      },
  });

    if (activities.length > 0) {
      res.status(200).json(activities);
    } else {
      res.status(404).json({ message: 'No activity found for this building' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Database query failed', details: error });
  }
}
