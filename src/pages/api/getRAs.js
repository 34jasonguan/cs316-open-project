// pages/api/getResidents.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Helper function to open the database
async function openDB() {
  return open({
    filename: './ra.sqlite',  // Path to your local SQLite database file
    driver: sqlite3.Database,
  });
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { raNetID } = req.query;  // Get the RA ID from the query parameters

    try {
      const db = await openDB();

      // Query the `hasRA` table to get all students linked to the given RA ID
      const residents = await db.all(
        'SELECT studentNetID, studentLastName, studentFirstName FROM hasRC WHERE rcNetID = ?',
        [rcNetID]
      );

      if (residents.length > 0) {
        res.status(200).json(residents);  // Return residents as JSON
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