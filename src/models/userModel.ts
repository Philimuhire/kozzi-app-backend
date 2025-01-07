import pool from '../config/db';

export const findUserByEmail = async (email: string) => {
  const query = 'SELECT * FROM users WHERE email = $1';
  const result = await pool.query(query, [email]);
  return result.rows[0];
};

export const createUser = async (email: string, password: string, name: string) => {
  const query = `
    INSERT INTO users (email, password, name) 
    VALUES ($1, $2, $3) 
    RETURNING id, email, name;
  `;
  const result = await pool.query(query, [email, password, name]);
  return result.rows[0];
};
