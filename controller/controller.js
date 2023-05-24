const User = require("../model/user")
exports.login = async function(req,res){

    const email = "123@gmail.com"
    console.log("e",email)
    const user = new User({
        userEmail:email
    })

    await user.save()
    return res.json({message: "data added successfull"})
}

module.exports = exports
