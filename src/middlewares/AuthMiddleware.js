const jwt = require("jsonwebtoken");
const { checkJWTToken } = require("../modules/jwt");

module.exports = async (req, res, next) => {
    try {

        let token = req.cookies.token;

        token = checkJWTToken(token)

        if(!token) {
            res.redirect("/login")
            return 
        }

        req.user = token

        next()

    } catch(e) {

    }
}