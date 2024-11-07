// pages/api/addAvailability.js
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { netid, dates } = req.body;

    try {
      const data = dates.map((date) => ({
        netid,
        available_date: new Date(date),
      }));

      await prisma.availability.createMany({
        data,
      });

      res.status(200).json({ message: 'Dates added successfully' });
    } catch (error) {
      console.error('Database error:', error.message);
      res.status(500).json({ error: 'Internal server error: ' + error.message });
    }
  } else {
    res.status(405).json({ message: 'Only POST requests are allowed' });
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
    if (req.method === 'POST') {
      const { netID, dates } = req.body;
  
      try {
        const db = await openDB();
  
        for (const date of dates) {
          await db.run(
            `INSERT INTO availability (netID, available_date) VALUES (?, ?)`,
            netID, 
            date
          );
        }
  
        res.status(200).json({ message: 'Dates added successfully' });
      } catch (error) {
        console.error('Database error:', error.message);
        res.status(500).json({ error: 'Internal server error: ' + error.message });
      }
    } else {
      res.status(405).json({ message: 'Only POST requests are allowed' });
    }
  }

  */