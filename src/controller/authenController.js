import loginRegister from '../service/loginRegister'
const handleSignup = async (req, res) => {
    try {
        let data = await loginRegister.handleRegister(req.body);
      
        if (data) {
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: "",
              });
        } else {
            return res.status(500).json({
                EM: "error from server",
                EC: "-1",
                DT: "",
              });
        }
      } catch (err) {
        console.error("Error fetching users:", err);
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
            DT: "",
          });
      }
}
const handleLogin = async (req, res) => {
  try {
      let data = await loginRegister.handleLogin(req.body);
    
    if (data) {
      req.session.authen=data.DT.access_token;
          return res.status(200).json({
              EM: data.EM,
              EC: data.EC,
              DT: "",
            });
      } else {
          return res.status(500).json({
              EM: "error from server",
              EC: "-1",
              DT: "",
            });
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({
          EM: "error from server",
          EC: "-1",
          DT: "",
        });
    }
}
const handleLogout = async (req, res) => {
  try {
    req.session.destroy()
    return res.status(200).json({
      EM: "clear cookies",
      EC: "0",
      DT: "",
    });
  } catch (error) {
    console.log("error: >>>>", error);

    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};
module.exports = {handleSignup,handleLogin,handleLogout}