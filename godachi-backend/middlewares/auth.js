const passport = require("passport");
const passportConfig = require("../passport");

exports.jwtAuth = async (req, res, next) =>{
	passport.authenticate("local", { session: false })
}


