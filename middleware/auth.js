const jwt = require("jsonwebtoken");
exports.middlewareValidation = (req, res) => {
    const token = req.headers.token;
    jwt.verify(token, "keyValue", (err, decode) => {
        if (err) {
            console.log("something uis missing");

        }
        else {
            req.email = decode.email;
            req.password = decode.password
            req.id = decode.id;
            next();
        }
    })
}