// pages/api/getAccessLevel.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { use } from 'react';

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

      const userClass = await db.get(
        'SELECT class FROM users WHERE netID = ? LIMIT 1',
        [netID]
      );
      
      if (userClass) {
        res.status(200).json(userClass);  // Return residents as JSON
      }
    } catch (error) {
      res.status(500).json({ error: 'Database query failed', details: error });
    }
  } else {
    res.status(405).json({ message: 'Only GET requests are allowed' });
  }
}