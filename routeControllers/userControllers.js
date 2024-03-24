const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

// desc POST all the contacts
// @route POST /user/register
// @access public
const register_User = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // conditions if any field is invalid
    if (!username || !email || !password) {
        res.status(400);
        res.json({ message: "All Fields are mandatory" })
        // throw new Error("All Fields are mandatory")
    }

    // conditions if any email has already been register
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        res.json({ message: "User Already Exist" })
        // throw new Error("User already Exist")
    }

    // Creating an User
    // hash-Password
    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);

    const user = await User.create(
        {
            username,
            email,
            password: hashPassword
        });
    console.log(`user has been created: ${user}`);
    if (user) {
        res.status(201).json({
            _id: user.id,
            email: user.email
        })
        // res.json({ message: "Register The User" })
    } else {
        res.status(400);
        res.json({ message: "Error Occured" })
    }
})



// desc POST all the contacts
// @route POST /user/login
// @access public
const login_user = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        res.json({
            message: "Please enter the valid Email-X and Password-X"
        })
    }

    // if its valid user
    const user = await User.findOne({ email });
    console.log(user);
    // compare the password of the current user and stored userpaassword in the DB
    const passwordCheck = await bcrypt.compare(password, user.password);
    // console.log(passwordCheck)
    if (user && passwordCheck) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "10m" }
        )
        res.status(200);
        res.json({ accessToken })
    } else {
        res.status(401);
        res.json({ message: "Invalid Password" })
    }
})


// desc current user info
// @route GET /user/login
// @access private
const current_user = asyncHandler(async (req, res) => {
    res.json(req.user)
})



module.exports = { register_User, login_user, current_user }