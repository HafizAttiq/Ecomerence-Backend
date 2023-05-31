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


var userStore = new store();


exports.mainbannerimg = async (req, res) => {
    console.log("req.body===>", req.body);
    
    const file = req.file;
    const index = req.body.index;
    const image = file.buffer.toString('base64');
  
    try {
      const result = await cloudinary.uploader.upload(`data:${file.mimetype};base64,${image}`, {
        resource_type: 'auto'
      });console.log("====>",result)
      
  
    //   const userStore = await YourModel.findOne(); // Retrieve the document from the collection
  
    //   if (!userStore) {
    //     // Handle the case where the document is not found
    //     return res.status(404).json({ error: 'Document not found' });
    //   }
  
      // Ensure mainBanner and images objects are defined
    //   userStore.mainBanner = userStore.mainBanner || {};
    //   userStore.mainBanner.images = userStore.mainBanner.images || [];
  
      // Check if the images array has enough elements to accommodate the specified index
    //   if (index >= userStore.mainBanner.images.length) {
    //     const emptyElementsToAdd = index - userStore.mainBanner.images.length + 1;
    //     userStore.mainBanner.images = userStore.mainBanner.images.concat(
    //       Array(emptyElementsToAdd).fill({ url: '' })
    //     );
    //   }
  
      // Update the URL at the specified index
    //   userStore.mainBanner.images[index].url = result.secure_url;
    // const user_store = await store.findOne({})
  
      var userStore = new store({
        mainBanner: {
           images: [{ url: result.secure_url }]
        },
        rightBanner: {
           images: []
        }
     });

     userStore.save().then(() => {
        res.status(200).json({ message: 'Data saved successfully',data:result
      });
        
     })
  
    //   res.json(userStore);
    } catch (error) {
      console.error('Failed to save data:', error);
      res.status(500).json({ error: 'Upload failed' });
    }
  };
  