// pages/api/executeQuery.js

import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Open the SQLite database
const openDB = async () => {
  return open({
    filename: './mydb.sqlite',  // Path to your SQLite database file
    driver: sqlite3.Database,
  });
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { query } = req.body;

    try {
      const db = await openDB();

      // Execute the SQL query
      const result = await db.all(query); // Use `db.get(query)` for a single result

      // Return the result as JSON
      res.status(200).json(result);

      // Close the database connection
      await db.close();
    } catch (error) {
      console.error('Error executing SQL query:', error);
      res.status(500).json({ error: 'Failed to execute SQL query' });
    }
  } else {
    // Only allow POST requests
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}