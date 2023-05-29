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
//     const file = req.file;
//   cloudinary.uploader.upload(file.buffer, (error, result) => {
//     if (error) {
//       res.status(500).json({ error: 'Upload failed' });
//     } else {
//       res.json({ url: result.secure_url });
//     }
//   });
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
    const file = req.file;
    try {
        const image = file.buffer.toString('base64');
        const result = await cloudinary.uploader.upload(`data:${file.mimetype};base64,${image}`, {
            resource_type: 'auto'
        });
        userStore.mainBanner.images.push({ url: result.secure_url });
        userStore.save()
        
      res.json({ url: result.secure_url });
    } catch (error) {
      res.status(500).json({ error: 'Upload failed' });
    }
    };
