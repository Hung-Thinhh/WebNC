require("dotenv").config();
import bcrypt from "bcryptjs";
import { createToken } from "../middleware/jwt";
import pool from "../config/connectDB";
// get the promise implementation, we will use bluebird
var salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
  var pass_hash = bcrypt.hashSync(password, salt);
  return pass_hash;
};
const checkEmail = async (email) => {
  const [user] = await pool
    .getPool()
    .query("SELECT * FROM users WHERE email = ?", [email]);
  console.log(user);

  if (user) {
    return true;
  }
  return false;
};
const checkUsername = async (name) => {
  const [user] = await pool
    .getPool()
    .query("SELECT * FROM users WHERE username = ? ", [name]);
  console.log(user);
  if (user[0]) {
    return true;
  }
  return false;
};
const handleRegister = async (data) => {
  console.log(data);

  try {
    let checkname = await checkUsername(data.username);

    if (checkname) {
      return {
        EM: "the user name already exists",
        EC: "1",
      };
    }

    let hashPass = hashPassword(data.password);
    const [rows] = await pool
      .getPool()
      .query("insert into users(username,password,email) values (?,  ?,  ?)", [
        data.username,
        hashPass,
        data.email,
      ]);
    if (rows.affectedRows > 0) {
      return {
        EM: "A user created successfully",
        EC: "0",
      };
    } else {
      return {
        EM: "A user created failed",
        EC: "1",
      };
    }
  } catch (error) {
    console.log("error: >>>>", error);
    return {
      EM: "error creating user",
      EC: "2",
    };
  }
};
const checkPassword = (inputPassword, hashPassword) => {
  return bcrypt.compareSync(inputPassword, hashPassword);
};
const handleLogin = async (data) => {
  try {
    const [user] = await pool
      .getPool()
      .query("SELECT * FROM users WHERE username = ? ", [data.username]);
    if (user[0]) {
      console.log("hahah");
      let isCorrectPassword = await checkPassword(
        data.password,
        user[0].password
      );
      if (isCorrectPassword) {
        let payload = {
          username: user[0].username,
          id: user[0].id,
          role: user[0].role,
          // active: user.active,
          // thongbao: user.thongbao,
        };
        let token = createToken(payload);


        return {
          EM: "ok!",
          EC: "0",
          DT: {
            access_token: token,
            email: user.email,
            name: user.username,
          },
        };
      }
    } else {
      console.log("hahah");
      return {
        EM: "Your email/phone or password is incorrect!",
        EC: "2",
        DT: "",
      };
    }

    return {
      EM: "Your email/phone or password is incorrect!",
      EC: "1",
      DT: "",
    };
  } catch (error) {
    console.log("error: >>>>", error);
    return {
      EM: "error creating user",
      EC: "2",
      DT: "",
    };
  }
};

module.exports = {
  handleRegister,
  handleLogin,
  checkEmail,
  checkUsername,
  checkPassword,
};
