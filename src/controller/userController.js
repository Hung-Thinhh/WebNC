import { getUsers, getUser, editUser,delUsers, addUsers } from "../service/userService";

const UserController = async (req, res) => {
  try {
    const users = await getUsers(req, res); // Truyền req và res vào hàm getUsers

    return res.render("user", {
      header: "header",
      footer: "footer",
      authen:req.user,
      user: users, // Gán users vào biến user trong view
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
const addUser = async (req, res) => {
  try {

    return res.render("addUser", {
      header: "header",
      footer: "footer",
      authen:req.user,
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
const AddUserController = async (req, res) => {
  try {
    const data = req.body
    console.log(data);
    
    const user = await addUsers(data); // Truyền req và res vào hàm getUsers
    if (user) {
      return res.json({ message: "Thành công cập nhật" });
    } else {
      return res.status(500).json({ message: "Lỗi cập nhật" });
    }
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
const DetailUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await getUser(id); // Truyền req và res vào hàm getUsers

    return res.render("detailUSer", {
      header: "header",
      footer: "footer",
      authen:req.user,
      user: user, // Gán users vào biến user trong view
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
const EditUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await getUser(id); // Truyền req và res vào hàm getUsers

    return res.render("editUser", {
      header: "header",
      footer: "footer",
      authen:req.user,
      user: user, // Gán users vào biến user trong view
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
const EditUserController = async (req, res) => {
  try {
    const data = req.body;
    const user = await editUser(data); // Truyền req và res vào hàm getUsers
    if (user) {
      return res.json({ message: "Thành công cập nhật" });
    } else {
      return res.status(500).json({ message: "Lỗi cập nhật" });
    }
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
const deleteUserController = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await delUsers(id); // Truyền req và res vào hàm getUsers
    if (user) {
      return res.json({ message: "Thành công cập nhật" });
    } else {
      return res.status(500).json({ message: "Lỗi cập nhật" });
    }
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  UserController,
  DetailUser,
  EditUser,
  EditUserController,
  deleteUserController,
  addUser,
  AddUserController
};
