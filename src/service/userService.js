import pool from "../config/connectDB"
const getUsers = async () => {
    try {
      const [rows] = await pool.getPool().query('SELECT * FROM users');
      return rows;
    } catch (err) {
      console.error('Error fetching users:', err);
      throw err;
    }
};
  export {getUsers}