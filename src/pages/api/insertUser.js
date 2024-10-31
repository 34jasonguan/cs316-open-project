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
        [userData['netID'], userData['lastname'], userData['firstname'], userData['year'], userData['email'], userData['phone'], userData['class']]
      );

      switch (userData['class']) {
        case 'student':
          for (const RA of userData['RA']) {
            await db.run(
              `
                INSERT INTO hasRA (studentNetID, studentLastName, studentFirstName, raNetID, raLastName, raFirstName)
                SELECT u1.netID, u1.lastname, u1.firstname, u2.netID, u2.lastname, u2.firstname
                FROM users u1, users u2
                WHERE u1.netID = ? AND u2.netID = ?
              `,
              [userData['netID'], RA.value]
            );
          }
        case 'RA':
          for (const student of userData['student']) {
            await db.run(
              `
                INSERT INTO hasRA (studentNetID, studentLastName, studentFirstName, raNetID, raLastName, raFirstName)
                SELECT u1.netID, u1.lastname, u1.firstname, u2.netID, u2.lastname, u2.firstname
                FROM users u1, users u2
                WHERE u1.netID = ? AND u2.netID = ?
              `,
              [student.value, userData['netID']]
            );
          }
          for (const RC of userData['RC']) {
            await db.run(
              `
                INSERT INTO hasRC (raNetID, raLastName, raFirstName, rcNetID, rcLastName, rcFirstName)
                SELECT u1.netID, u1.lastname, u1.firstname, u2.netID, u2.lastname, u2.firstname
                FROM users u1, users u2
                WHERE u1.netID = ? AND u2.netID = ?
              `,
              [userData['netID'], RC.value]
            );
          }
        case 'RC':
          for (const RA of userData['RA']) {
            await db.run(
              `
                INSERT INTO hasRC (raNetID, raLastName, raFirstName, rcNetID, rcLastName, rcFirstName)
                SELECT u1.netID, u1.lastname, u1.firstname, u2.netID, u2.lastname, u2.firstname
                FROM users u1, users u2
                WHERE u1.netID = ? AND u2.netID = ?
              `,
              [RA.value, userData['netID']]
            );
          }
        default:
          
      }

      res.status(200).json({});
    } catch (error) {
      res.status(500).json({ error: 'Database query failed', details: error });
    }
  } else {
    res.status(405).json({ message: 'Only POST requests are allowed' });
  }
}