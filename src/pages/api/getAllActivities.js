import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { format } from 'date-fns'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const activities = await prisma.activities.findMany({
        select: {
          name: true,
          date: true,
          time: true,
          room_number: true,
          building_name: true,
        },
      })

      if (activities.length > 0) {
        const formattedActivities = activities.map(activity => ({
          ...activity,
          date: activity.date ? format(new Date(activity.date), 'MMM dd, yyyy') : null,
          time: activity.time ? format(new Date(activity.time), 'hh:mm a') : null,
        }))
        res.status(200).json(formattedActivities)
      } else {
        res.status(404).json({ message: 'No activities found' })
      }
    } catch (error) {
      res.status(500).json({ error: 'Database query failed', details: error.message })
    }
  } else {
    res.status(405).json({ message: 'Only GET requests are allowed' })
  }
}