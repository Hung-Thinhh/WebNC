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
    console.log('hahahahah');
    
    req.session.destroy()
    res.cookie('connect.sid', null, { expires: new Date(0) });
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
const accountUser = (req, res) => {
  console.log(req.user);
  return res.status(200).json({
    EM: "ok!",
    EC: "0",
    DT: {
      access_token: req.token,
      role: req.user.role,
      email: req.user.email,
      username: req.user.username,
      active: req.user.active,
    },
  });
};
module.exports = {handleSignup,handleLogin,handleLogout,accountUser}