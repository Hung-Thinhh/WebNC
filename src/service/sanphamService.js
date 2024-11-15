import db from "../models/index";
const getListSp = async (id) => {
  try {
    let sp = await db.Sanpham.findAll({
      where: {
        id_nhom: id
      }
      });
      if (sp) {
          return {
            EM: "ok!",
            EC: "0",
            DT: sp
          };
      }
  } catch (err) {
    console.error("Error fetching users:", err);
    throw err;
  }
};
const getSp = async (id) => {
  try {
    let sp = await db.Sanpham.findOne({
      where: {
        id: id
      }
      });
      if (sp) {
          return {
            EM: "ok!",
            EC: "0",
            DT: sp
          };
      }
  } catch (err) {
    console.error("Error fetching users:", err);
    throw err;
  }
};
export { getListSp,getSp };
