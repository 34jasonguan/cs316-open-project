// pages/api/insertUser.js
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const userData = JSON.parse(req.body);

    try {
      const userExistsInUsers = await prisma.users.findUnique({
        where: {
          netid: userData['netid'],
        },
        select: {
          netid: true,
        },
      });

      const userExistsInPassword = await prisma.password.findUnique({
        where: {
          netid: userData['netid'],
        },
        select: {
          netid: true,
        },
      });

      if (userExistsInUsers || userExistsInPassword) {
        return res.status(409).json({ message: 'This netID has already been registered!' });
      }

      await prisma.password.create({
        data: {
          netid: userData['netid'],
          password: userData['password'],
        },
      });

      await prisma.users.create({
        data: {
          netid: userData['netid'],
          lastname: userData['lastname'],
          firstname: userData['firstname'],
          year: 'freshman', 
          email: userData['email'],
          phone: userData['phone'],
          class: 'Student', 
        },
      });

      res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Database query failed:', error);
      res.status(500).json({ error: 'Database query failed', details: error.message });
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
    const userData = JSON.parse(req.body);
    try {
      const db = await openDB();

      const users1 = await db.get(
        'SELECT netid FROM users WHERE netid = ? LIMIT 1',
        [userData['netid']]
      );

      const users2 = await db.get(
        'SELECT netid FROM password WHERE netid = ? LIMIT 1',
        [userData['netid']]
      );
      

      if (users1 || users2) {
        res.status(404).json({ message: 'This netid has already been registered!' });
      }

      await db.run(
        'INSERT INTO password (netid, password) VALUES (?, ?)',
        [userData['netid'], userData['password']]
      );

      await db.run(
        'INSERT INTO users (netid, lastname, firstname, year, email, phone, class) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [userData['netid'], userData['lastname'], userData['firstname'], 'freshman', userData['email'], userData['phone'], 'Student']
      );
      res.status(200).json({});
    } catch (error) {
      res.status(500).json({ error: 'Database query failed', details: error });
    }
  } else {
    res.status(405).json({ message: 'Only POST requests are allowed' });
  }
}
  */