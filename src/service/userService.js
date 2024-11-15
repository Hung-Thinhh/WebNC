import db from "../models/index";
const getUsers = async () => {
    try {
      const user = await db.User.findAll();
      return user;
    } catch (err) {
      console.error('Error fetching users:', err);
      throw err;
    }
};
const getUser = async (id) => {
  try {
    const user = await db.User.find({
      where: {
        id: id
      }
    });
    return user;
  } catch (err) {
    console.error('Error fetching users:', err);
    throw err;
  }
};
const getProfileUser = async (id) => {
  try {
    const user = await db.User.findOne({
      where: {
        id: id
      }
    });
    return user;
  } catch (err) {
    console.error('Error fetching users:', err);
    throw err;
  }
};
const editUser = async (data) => {
  try {
    console.log(data);
    
   const user = await User.update(
      {
        fullname: data.fullname,
        address: data.address,
        email: data.email,
        sex: data.sex,
      },
      {
        where: {
          id: data.id,
        },
      }
    );
    if (user) {
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
    
    const [user, created] = await db.User.upsert({
      username: data.username,
      password: data.pass,
      fullname: data.fullname,
      address: data.address,
      email: data.email,
      sex: data.sex,
    });
    if (created) {
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
    
    const [rows, metadata] = await User.destroy({
      where: { id: id },
    });
    if (rows > 0) {
      return { message: "Đã cập nhật" };
    } else {
      return{ message: "Lỗi cập nhật" };
    }
  } catch (err) {
    console.error('Error fetching users:', err);
    throw err;
  }
};
  export {getUsers,getUser,editUser,delUsers,addUsers,getProfileUser}