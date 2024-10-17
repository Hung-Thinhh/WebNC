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
const getUser = async (id) => {
  try {
    const [rows] = await pool.getPool().query('SELECT * FROM users where id =?',[id]);
    return rows[0];
  } catch (err) {
    console.error('Error fetching users:', err);
    throw err;
  }
};
const editUser = async (data) => {
  try {
    console.log(data);
    
    const [rows] = await pool.getPool().query('update users set fullname =?, address=?, email=?, sex=? where id =?', [data.fullname, data.address, data.email, data.sex, data.id]);
    if (rows.affectedRows > 0) {
      return { message: "Đã cập nhật" };
    } else {
      return { message: "Lỗi cập nhật" };
    }
  } catch (err) {
    console.error('Error fetching users:', err);
    throw err;
  }
};
const addUsers = async (data) => {
  try {
    console.log(data);
    
    const [rows] = await pool.getPool().query('insert into users(username,password,fullname, address,email,sex) values (?, ?, ?, ?, ?, ?)', [data.username,data.pass,data.fullname, data.address, data.email, data.sex]);
    if (rows.affectedRows > 0) {
      return { message: "Đã cập nhật" };
    } else {
      return res.status(500).json({ message: "Lỗi cập nhật" });
    }
  } catch (err) {
    console.error('Error fetching users:', err);
    throw err;
  }
};
const delUsers = async (id) => {
  try {
    console.log(id);
    
    const [rows] = await pool.getPool().query('delete from users where id =?', [id]);
    if (rows.affectedRows > 0) {
      return { message: "Đã cập nhật" };
    } else {
      return{ message: "Lỗi cập nhật" };
    }
  } catch (err) {
    console.error('Error fetching users:', err);
    throw err;
  }
};
  export {getUsers,getUser,editUser,delUsers,addUsers}