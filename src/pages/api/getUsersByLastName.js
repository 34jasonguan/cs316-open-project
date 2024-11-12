// pages/api/getStudentByLastName.js
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { searchedClass, inputValue } = req.query; 
    try {
      const students = await prisma.users.findMany({
        where: {
          class: searchedClass || undefined,
          lastname: {
            contains: inputValue,
          },
        },
        select: searchedClass 
          ? { netid: true, lastname: true, firstname: true } 
          : undefined, 
      });

      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ error: 'Database query failed', details: error.message });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ message: 'Only GET requests are allowed' });
  }
}