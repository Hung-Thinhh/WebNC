import { getUsers } from "../service/userService";

const UserController = async (req, res) => {
  try {
      const users = await getUsers(req, res); // Truyền req và res vào hàm getUsers
      
    return res.render("user", {
      header: "header",
      footer: "footer",
      user: users, // Gán users vào biến user trong view
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { UserController };