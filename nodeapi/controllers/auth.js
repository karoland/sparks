const jwt = require("jsonwebtoken");
require("dotenv").config();
const expressJwt = require("express-jwt");
const User = require("../models/user");


exports.signup = async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    const userExists = await User.findOne({ email: req.body.email });
    if (userExists)
        return res.status(403).json({
            error: "Email is taken!"
        });


    const user = await new User(req.body);
    await user.save();
    res.status(200).json({ message: "Zejestracja zakończona sukcesem! Zaloguj się." });
};

exports.signin = (req, res) => {
    // find the user based on email
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        // if err or no user
        if (err || !user) {
            return res.status(401).json({
                error: "Użytkownik z takim emailem nie istnieje. Zarejestruj się."
            });
        }
        // if user is found make sure the email and password match
        // create authenticate method in model and use here
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email i hasło nie pasują"
            });
        }
        // generate a token with user id and secret
        const token = jwt.sign(
            { _id: user._id},
            process.env.JWT_SECRET
        );
        // persist the token as 't' in cookie with expiry date
        res.cookie("t", token, { expire: new Date() + 9999 });
        // retrun response with user and token to frontend client
        const { _id, name, email } = user;
        return res.json({ token, user: { _id, email, name } });
    });
};

exports.signout = (req, res) => {
    res.clearCookie("t");
    return res.json({ message: "Wylogowałeś się!" });
};

exports.requireSignin = expressJwt({
    secret: process.env.SECRET,
    userProperty: "w_auth"
});