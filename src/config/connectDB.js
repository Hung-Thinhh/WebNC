const mysql = require("mysql2/promise");

// Tạo kết nối đến cơ sở dữ liệu
const pool = mysql.createPool({
  host: "localhost", // Địa chỉ host của MySQL
  user: "root", // Tên người dùng MySQL
  password: "", // Mật khẩu của MySQL
  database: "ltwebnc", // Tên database muốn kết nối
  port: "3306",
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database!");
  connection.release();
});
module.exports = {
  getPool: () => pool,
};
