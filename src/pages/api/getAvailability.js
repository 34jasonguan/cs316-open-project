// pages/api/getResidents.js
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { netid } = req.query; 
    try {
      const available_dates = await prisma.availability.findMany({
        where: {
          netid: netid,
        },
        select: {
          available_date: true,
        },
      });

      if (available_dates.length > 0) {
        res.status(200).json(available_dates);  
      } else {
        res.status(404).json({ message: 'No available dates found' });
      }
    } catch (error) {
      console.error('Database query failed:', error);
      res.status(500).json({ error: 'Database query failed', details: error.message });
    }
  } else {
    res.status(405).json({ message: 'Only GET requests are allowed' });
  }
}

/*
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function openDB() {
  return open({
    filename: './ra.sqlite', 
    driver: sqlite3.Database,
  });
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { netID } = req.query; 
    
    try {
      const db = await openDB();

      const available_dates = await db.all(
        'SELECT available_date FROM availability WHERE netID = ?',
        [netID]
      );

      if (available_dates.length > 0) {
        res.status(200).json(available_dates);  // Return residents as JSON
      } else {
        res.status(404).json({ message: 'No available_dates found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Database query failed', details: error });
    }
  } else {
    res.status(405).json({ message: 'Only GET requests are allowed' });
  }
}
  */