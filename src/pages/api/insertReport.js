// pages/api/insertReport.js

import prisma from '../../../lib/prisma'; 

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      type,
      urgency,
      description,
      isAnonymous,
      location,
      issueType,
      equipment,
    } = req.body;

    // increment last ID by 1 to find new ID
    const lastReport = await prisma.report.findFirst({
      orderBy: { id: 'desc' },
    });
    const nextId = lastReport ? lastReport.id + 1 : 1;

    const newReport = await prisma.report.create({
      data: {
        id: nextId,
        type,
        urgency,
        description,
        submitted_by: 'admin',
        is_anonymous: isAnonymous,
        location,
        issue_type: type === 'safety' ? issueType : null,
        equipment: type === 'maintenance' ? equipment : null,
        timestamp: new Date(),
      },
    });

    res.status(200).json({ message: 'Report submitted successfully', report: newReport });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to submit report' });
  }
}
