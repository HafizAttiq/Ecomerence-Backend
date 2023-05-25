const User = require("../model/user");
const jwt = require("jsonwebtoken");


exports.login = async (req, res) => {
    const { email, password } = req.body;
    await User.findOne({ email: email, password: password })
        .then(user => {
            if (!user) {
                return req.status(401).json({ message: "Invalid User" })
            };
            const token = jwt.sign({ userId: user._id, email: email }, "keyValue");
            res.status(200).json({
                message: "token generate",
                tokens: token
            })

        })

}
exports.RegisterUser = async (req, res) => {
    try {
        const newUser = new User({
            fristName: req.body.fristName,
            Fathername: req.body.Fathername,
            email: req.body.email,
            password: req.body.password,
            conformPassword: req.body.password,
            phoneNumber: req.body.phoneNumber
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


