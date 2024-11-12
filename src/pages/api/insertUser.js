// pages/api/insertUser.js
import prisma from '../../../lib/prisma'; 

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {
      netID, firstname, lastname, phone, email,
      Class, year, students, RAs, RCs, password
    } = req.body;

    if (!netID) {
      return res.status(400).json({ message: 'netID is required' });
    }

    try {
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
          netid: netID, 
          lastname, 
          firstname, 
          year, 
          email, 
          phone, 
          class: Class,
        },
      });

      const newUserPassword = await prisma.password.create({
        data: {
          netid: netID, 
          password,
        },
      });
      
      // beginning of switch  
      let global; 
      switch (Class) {
        case 'student':
          for (const RA of RAs) {
            const student = await prisma.users.findUnique({
              where: {
                netid: netID,
              },
              select: {
                netid: true, lastname: true, firstname: true
              },
            });
            console.log(RA)
            if (!RA.value) {
              return res.status(400).json({ message: 'netID is required' });
            }
            const ra = await prisma.users.findUnique({
              where: {
                netid: RA.value,
              },
              select: {
                netid: true, lastname: true, firstname: true
              },
            });
            global = await prisma.hasra.create({
              data: {
                studentnetid: student['netid'],
                studentlastname: student['lastname'],
                studentfirstname: student['firstname'],
                ranetid: ra['netid'],
                ralastname: ra['lastname'],
                rafirstname: ra['firstname'],
              },
            });
          }
        break; 

        /*

        case 'RA':
          for (const Student of students) {
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
            const newRelation2 = await prisma.hasra.create({
              data: {
                studentnetid: student['netID'],
                studentlastname: student['lastname'],
                studentfirstname: student['firstname'],
                ranetid: ra['netID'],
                ralastname: ra['lastname'],
                rafirstname: ra['firstname'],
              },
            });
          }
          for (const RC of RCs) {
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
            const newRelation3 = await prisma.hasrc.create({
              data: {
                rcnetid: rc['netID'],
                rclastname: rc['lastname'],
                rcfirstname: rc['firstname'],
                ranetid: ra['netID'],
                ralastname: ra['lastname'],
                rafirstname: ra['firstname'],
              },
            });
          }
        break; 

        case 'RC':
          for (const RA of RAs) {
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
            const newRelation4 = await prisma.hasrc.create({
              data: {
                rcnetid: rc['netID'],
                rclastname: rc['lastname'],
                rcfirstname: rc['firstname'],
                ranetid: ra['netID'],
                ralastname: ra['lastname'],
                rafirstname: ra['firstname'],
              },
            });
          }
        break; 

        */
        default:

      // end of switch

          
      } 

      res.status(200).json({ message: 'Account registered successfully', users: newUser, password: newUserPassword, hasra: global });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to register', details: error  });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}