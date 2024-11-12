// pages/api/insertActivity.js
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { programName, building, room, date, time } = req.body;

    try {
      let activityId;
      let exists = true;
      while (exists) {
        activityId = Math.floor(100 + Math.random() * 900); // Generate a 3-digit ID
        const existingActivity = await prisma.activities.findUnique({
          where: { activityid: activityId },
        });
        exists = Boolean(existingActivity);
      }

      const newActivity = await prisma.activities.create({
        data: {
          activityid: activityId,
          name: programName,
          building_name: building,
          room_number: room,
          date: new Date(date), 
          time: new Date(`1970-01-01T${time}:00Z`), 
        },
      });

      res.status(201).json({ message: 'Activity created successfully', newActivity });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create activity' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
