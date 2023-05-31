const User = require("../model/user");
const jwt = require("jsonwebtoken");
const cloudinary = require('cloudinary').v2;
const user = require('../model/user')
const store = require('../model/store')

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

exports.imageUpload = async (req, res) => {

const file = req.file;
try {
    const image = file.buffer.toString('base64');
    const result = await cloudinary.uploader.upload(`data:${file.mimetype};base64,${image}`, {
        resource_type: 'auto'
    });
    console.log("----------",result)
    const user = new store({
        url: result.secure_url
        // mainBanner:mainBanner.images[result],
      });
      await user.save();
    //  await  image.save()

  res.json({ url: result.secure_url });
} catch (error) {
  res.status(500).json({ error: 'Upload failed' });
}
};

const userStore = new store();
exports.mainbannerimg = async (req, res) => {
    console.log("req.body===>", req.body);
    
    const file = req.file;
    console.log("req.file===>", req.file)
    try {
        let index = req.body.index;
        const image = file.buffer.toString('base64');
        console.log("===========================================1111");

        const result = await cloudinary.uploader.upload(`data:${file.mimetype};base64,${image}`, {
            resource_type: 'auto'
        });
        console.log("===========================================", result);
        userStore['mainBanner']['images'][index]['url'] = result.secure_url;
        console.log("=======================userStore===>", userStore);
        userStore.save()
        
        return res.json(userStore);
    } catch (error) {
        return res.status(500).json({ error: 'Upload failed' });
    }
    };
