require("dotenv").config();
import bcrypt from "bcryptjs";
import { createToken } from "../middleware/jwt";
import db from "../models/index";
// get the promise implementation, we will use bluebird
var salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
  var pass_hash = bcrypt.hashSync(password, salt);
  return pass_hash;
};
const checkEmail = async (email) => {
  const user = await db.User.findAll({
    where: {
      email: email
    }
  });
  console.log(user);

  if (user) {
    return true;
  }
  return false;
};
const checkUsername = async (name) => {
  const user = await db.User.findAll({
    where: {
      username: name
    }
  });
  console.log(user);
  if (user.length>0) {
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
    const user = await db.User.create({
      username: data.username,
      password: hashPass,
      email: data.email
    });
   
    if (user) {
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
    const user = await db.User.findOne({
      where: {
        username: data.username
      }
    });
    if (user) {
      let isCorrectPassword =  checkPassword(
        data.password,
        user.password
      );
      if (isCorrectPassword) {
        let payload = {
          username: user.username,
          id: user.id,
          role: user.role,
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
