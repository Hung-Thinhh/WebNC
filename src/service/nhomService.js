import db from "../models/index";
const getAllNhom = async () => {
  try {
      let nhom = await db.Nhom.findAll();
      if (nhom) {
          
          return {
            EM: "ok!",
            EC: "0",
            DT: nhom
          };
      }
  } catch (err) {
    console.error("Error fetching users:", err);
    throw err;
  }
};
export { getAllNhom };
