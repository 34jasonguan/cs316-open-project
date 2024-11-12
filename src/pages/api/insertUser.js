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
    const {
      netID, firstname, lastname, phone, email,
      Class, year, student, RA, RC, password
    } = req.body;
    try {
      const db = await openDB();

      const users1 = await prisma.users.findUnique({
        where: {
          netid: netID,
        },
        select: {
          netid: true,
        },
      });

      const users2 = await prisma.password.findUnique({
        where: {
          netid: netID,
        },
        select: {
          netid: true,
        },
      });
      

      if (users1 || users2) {
        res.status(404).json({ message: 'This netID has already been registered!' });
      }

      const newUser = await prisma.users.create({
        data: {
          netID, lastname, firstname, year, email, phone, Class,
        },
      });

      const newUserPassword = await prisma.password.create({
        data: {
          netID, password,
        },
      });

      switch (Class) {
        case 'student':
          for (const RA of userData['RA']) {
            const student = await prisma.users.findUnique({
              where: {
                netid: netID,
              },
              select: {
                netid: true, lastname: true, firstname: true
              },
            });
            const ra = await prisma.users.findUnique({
              where: {
                netid: RA.value,
              },
              select: {
                netid: true, lastname: true, firstname: true
              },
            });
            const newRelation1 = await prisma.hasRA.create({
              data: {
                studentNetID: student['netID'],
                studentLastName: student['lastname'],
                studentFirstName: student['firstname'],
                raNetID: ra['netID'],
                raLastName: ra['lastname'],
                raFirstName: ra['firstname'],
              },
            });
          }
        case 'RA':
          for (const Student of userData['student']) {
            const student = await prisma.users.findUnique({
              where: {
                netid: Student.value,
              },
              select: {
                netid: true, lastname: true, firstname: true
              },
            });
            const ra = await prisma.users.findUnique({
              where: {
                netid: netID,
              },
              select: {
                netid: true, lastname: true, firstname: true
              },
            });
            const newRelation2 = await prisma.hasRA.create({
              data: {
                studentNetID: student['netID'],
                studentLastName: student['lastname'],
                studentFirstName: student['firstname'],
                raNetID: ra['netID'],
                raLastName: ra['lastname'],
                raFirstName: ra['firstname'],
              },
            });
          }
          for (const RC of userData['RC']) {
            const rc = await prisma.users.findUnique({
              where: {
                netid: RC.value,
              },
              select: {
                netid: true, lastname: true, firstname: true
              },
            });
            const ra = await prisma.users.findUnique({
              where: {
                netid: netID,
              },
              select: {
                netid: true, lastname: true, firstname: true
              },
            });
            const newRelation3 = await prisma.hasRC.create({
              data: {
                rcNetID: rc['netID'],
                rcLastName: rc['lastname'],
                rcFirstName: rc['firstname'],
                raNetID: ra['netID'],
                raLastName: ra['lastname'],
                raFirstName: ra['firstname'],
              },
            });
          }
        case 'RC':
          for (const RA of userData['RA']) {
            const rc = await prisma.users.findUnique({
              where: {
                netid: netID,
              },
              select: {
                netid: true, lastname: true, firstname: true
              },
            });
            const ra = await prisma.users.findUnique({
              where: {
                netid: RA.value,
              },
              select: {
                netid: true, lastname: true, firstname: true
              },
            });
            const newRelation4 = await prisma.hasRC.create({
              data: {
                rcNetID: rc['netID'],
                rcLastName: rc['lastname'],
                rcFirstName: rc['firstname'],
                raNetID: ra['netID'],
                raLastName: ra['lastname'],
                raFirstName: ra['firstname'],
              },
            });
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