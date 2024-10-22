// pages/api/checkNewUser.js
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

      const passwordTrue = await db.get(
        'SELECT password FROM password WHERE netID = ? LIMIT 1',
        [netID]
      );
      
      if (passwordTrue) {
        res.status(200).json(passwordTrue);  // Return residents as JSON
      } else {
        res.status(404).json({ message: 'No password found for the netID' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Database query failed', details: error });
    }
  } else {
    res.status(405).json({ message: 'Only GET requests are allowed' });
  }
}