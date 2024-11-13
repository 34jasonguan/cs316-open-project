// pages/api/getReports.js

import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { userId, reportId, type, urgency, inputValue } = req.query;

    try {
      // 
      const whereConditions = {};

      if (userId) {
        whereConditions.submitted_by = userId;
      }

      if (reportId) {
        const id = parseInt(reportId);
        if (!isNaN(id)) {
          whereConditions.id = id;
        } else {
          return res.status(400).json({ error: 'Invalid reportId' });
        }
      }

      if (type) {
        whereConditions.type = type;
      }

      if (urgency) {
        whereConditions.urgency = urgency;
      }

      if (inputValue) {
        whereConditions.OR = [
          { description: { contains: inputValue, mode: 'insensitive' } },
          { location: { contains: inputValue, mode: 'insensitive' } },
          { issue_type: { contains: inputValue, mode: 'insensitive' } },
          { equipment: { contains: inputValue, mode: 'insensitive' } },
        ];
      }

      // 
      console.log('Query Conditions:', whereConditions);

      // 
      const reports = await prisma.report.findMany({
        where: whereConditions,
        orderBy: {
          timestamp: 'desc',
        },
      });

      // 
      console.log('Reports fetched:', reports.length);

      res.status(200).json(reports);
    } catch (error) {
      console.error('Error fetching reports:', error);
      res.status(500).json({ error: 'Failed to fetch reports', details: error.message });
    } finally {
      // 
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ message: 'Only GET requests are allowed' });
  }
}
