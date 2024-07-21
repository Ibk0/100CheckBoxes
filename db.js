// src/db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('Connected to the database');
});

const createTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS checkboxes (
      id SERIAL PRIMARY KEY,
      state BOOLEAN[] DEFAULT ARRAY[false]::BOOLEAN[]
    )
  `;
  try {
    await pool.query(queryText);
    const res = await pool.query('SELECT * FROM checkboxes');
    if (res.rows.length === 0) {
      await pool.query('INSERT INTO checkboxes (state) VALUES ($1)', [new Array(100).fill(false)]);
    }
  } catch (err) {
    console.error(err);
  }
};

createTable();

module.exports = pool;
