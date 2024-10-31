// pages/api/getStudentByNetID.js
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
    const { searchedClass, inputValue } = req.query; 
    try {
      const db = await openDB();

      const students = await db.all(
        'SELECT netID, lastname, firstname FROM users WHERE class = ? AND netID LIKE ?',
        [searchedClass, '%' + inputValue + '%']
      );

      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ error: 'Database query failed', details: error });
    }
  } else {
    res.status(405).json({ message: 'Only GET requests are allowed' });
  }
}