require("dotenv").config();
import jwt from "jsonwebtoken";

const createToken = (payload) => {
  let key = process.env.JWT_SECRET_KEY;
  let token = null;
  try {
    token = jwt.sign(payload, key, { expiresIn: process.env.JWT_EXPIRES_IN });
  } catch (error) {
    console.log(error);
  }
  return token;
};
const verifyToken = (token) => {
  let key = process.env.JWT_SECRET_KEY;
  let decode = null;

  try {
    decode = jwt.verify(token, key);
  } catch (error) {
    console.log(error);
  }
  return decode;
};

const nonSecurePaths = [
  "/signup",
  "/login",
  "/api/login",
  "/api/signup",
  "/api/getNhom","/getNhom"
];
const adminSecurePaths = [
  "/api/editUser",
  "/api/addUser",
  "/api/delete-user",
  "/detail-user",
  "/edit-user",
];

const extractToken = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};
const checkUserJWT = (req, res, next) => {
  console.log('api ne: ',req.path);
  if (nonSecurePaths.includes(req.path)) {
    console.log('saoooooooooooooooo');
    
    return next()
  }
  else {
    
  let cookies = req.session.authen;

  let tokenFromHeader = extractToken(req);
  if (cookies || tokenFromHeader) {
    let token = cookies ? cookies : tokenFromHeader;
    let decoded = verifyToken(token);
    console.log(decoded);

    if (decoded) {
      req.user = decoded;
      req.token = token;
      next();
    } else {
      return res.status(401).json({
        EC: "-1",
        DT: "",
        EM: "Not authenticated the user",
      });
    }
  } else {
    return res.status(401).json({
      EC: "-1",
      DT: "",
      EM: "Not authenticated the user",
    });
  }
  }

};
const checkUser = (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) return next();

  let cookies = req.session.authen;
  console.log(req.path);

  let tokenFromHeader = extractToken(req);
  if (cookies || tokenFromHeader) {
    let token = cookies ? cookies : tokenFromHeader;
    let decoded = verifyToken(token);
    console.log(decoded);

    if (decoded) {
      req.user = decoded;
      req.token = token;
      next();
    } else {
      return res.status(401).json({
        EC: "-1",
        DT: "",
        EM: "Not authenticated the user",
      });
    }
  } else {
    req.token = {};
    next();
  }
};
const checkUserPermission = (req, res, next) => {
  if (
    nonSecurePaths.includes(req.path) 
  )
    return next();

  if (req.user) {
    let role = req.user.role;
    console.log('role',role);
    
    if (role !==0 && role !==1) {
      console.log('what');

      return res.status(200).json({
        EC: "-1",
        DT: "",
        EM: `You don't have permission to access this resource...`,
      });
    } else {
      if (role == 0) {
        console.log('saooooo');
        next();
      } else if (role == 1 && (req.params.id == req.user.id || req.body.id == req.user.id)) {
        console.log('mm');

        next();
      } else {
        console.log('what');

        return res.status(200).json({
          EC: "-1",
          DT: "",
          EM: `You don't have permission to access this resource...`,
        });
      }
    }
  } else {
    return res.status(401).json({
      EC: "-1",
      DT: "",
      EM: "Not authenticated the user",
    });
  }
};
module.exports = {
  createToken,
  verifyToken,
  checkUserJWT,
  checkUser,
  checkUserPermission,
};
