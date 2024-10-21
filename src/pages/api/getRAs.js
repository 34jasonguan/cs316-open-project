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
    const { rcNetID } = req.query; 
    try {
      const db = await openDB();

      const RAs = await db.all(
        'SELECT raNetID, raLastName, raFirstName FROM hasRC WHERE rcNetID = ?',
        [rcNetID]
      );

      if (RAs.length > 0) {
        res.status(200).json(RAs);  // Return residents as JSON
      } else {
        res.status(404).json({ message: 'No RAs found for this RC' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Database query failed', details: error });
    }
  } else {
    res.status(405).json({ message: 'Only GET requests are allowed' });
  }
}