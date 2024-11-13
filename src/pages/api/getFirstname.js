// pages/api/getResidents.js
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

      const firstname = await db.get(
        'SELECT netID FROM users WHERE netID = ? LIMIT 1',
        [netID]
      );

      if (firstname) {
        res.status(200).json(firstname);  // Return residents as JSON
      } else {
        res.status(404).json({ message: 'The NetID is not registered yet!' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Database query failed', details: error });
    }
  } else {
    res.status(405).json({ message: 'Only GET requests are allowed' });
  }
}