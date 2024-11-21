// pages/api/insertReport.js

import prisma from '../../../lib/prisma'; 
import multer from "multer";
import { promisify } from "util";
import fs from "fs";

const upload = multer({ dest: "public/uploads/" });
const uploadMiddleware = promisify(upload.single("attachment")); 

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await uploadMiddleware(req, res);
    const {
      type,
      urgency,
      description,
      isAnonymous,
      location,
      issueType,
      equipment,
    } = req.body;

    const attachmentPath = req.file ? `/uploads/${req.file.filename}` : null; 

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
        is_anonymous: isAnonymous,
        submitted_by,
        location,
        issue_type: type === 'safety' ? issueType : null,
        equipment: type === 'maintenance' ? equipment : null,
        attachment: attachmentPath, 
        timestamp: new Date(),
      },
    });

    res.status(200).json({ message: 'Report submitted successfully', report: newReport });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to submit report' });
  }
}
