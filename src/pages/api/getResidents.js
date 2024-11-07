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
    const { raNetID } = req.query; 

    try {
      const db = await openDB();

      const residents = await db.all(
        'SELECT u.netid, u.firstname, u.lastname, u.email, u.phone FROM users u, hasRA h WHERE raNetID = ? AND u.netid = h.studentNetID',
        [raNetID]
      );

      if (residents.length > 0) {
        res.status(200).json(residents); 
      } else {
        res.status(404).json({ message: 'No residents found for this RA' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Database query failed', details: error });
    }
  } else {
    res.status(405).json({ message: 'Only GET requests are allowed' });
  }
}
