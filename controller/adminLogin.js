const userAdminSchema = require("../model/adminLogin");
const jwt = require("jsonwebtoken");

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userAdminSchema.findOne({ email: email });
    if (!user) {
    return res.status(401).json({ message: "Invalid User" });
    }
    const token = jwt.sign({ userId: user._id, email: email }, "keyValue");
    console.log(token);
    return res.status(200).json({
      message: "Admin Login Successfully",
      token: token
    })}
    catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.adminRegister = async (req, res) => {
    try {
        const newUser = new userAdminSchema({
            email: "naqeeb3660@gmail.com",
            password: "naqeeb143",
           
        });
        console.log(newUser)
        await newUser.save();
        res.json({
            message: "User saved successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred",
        });
    }
};

