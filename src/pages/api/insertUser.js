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
  if (req.method === 'POST') {
    const userData = JSON.parse(req.body);
    try {
      const db = await openDB();

      const users1 = await db.get(
        'SELECT netID FROM users WHERE netID = ? LIMIT 1',
        [userData['netID']]
      );

      const users2 = await db.get(
        'SELECT netID FROM password WHERE netID = ? LIMIT 1',
        [userData['netID']]
      );
      

      if (users1 || users2) {
        res.status(404).json({ message: 'This netID has already been registered!' });
      }

      await db.run(
        'INSERT INTO password (netID, password) VALUES (?, ?)',
        [userData['netID'], userData['password']]
      );

      await db.run(
        'INSERT INTO users (netID, lastname, firstname, year, email, phone, class) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [userData['netID'], userData['lastname'], userData['firstname'], 'freshman', userData['email'], userData['phone'], 'Student']
      );
      res.status(200).json({});
    } catch (error) {
      res.status(500).json({ error: 'Database query failed', details: error });
    }
  } else {
    res.status(405).json({ message: 'Only POST requests are allowed' });
  }
}