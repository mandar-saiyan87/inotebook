import express from "express";
import User from "../models/User.js";
import { body, validationResult } from 'express-validator';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fetchuser from "../middleware/fetchuser.js";

const router = express.Router();

const JWT_SECRET = 'THISisJWTsecretKEY$$$';
// const JWT_SECRET = process.env.JWT_SECRET;

// ROUTE:1 - Create new user. No login required. /api/auth/createuser
router.post("/createuser", [
    // Validating User inputs using expres-validator

    body('name', 'Enter valid name').isLength({ min: 3 }),
    body('email', 'Enter valid email').isEmail(),
    body('password', 'Enter valid password').isLength({ min: 5 }),
], async (req, res) => {

    // If error return bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Check if email already exist
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: 'User already exists with this email' });
        }
        // Salting and encrypt password using bcryptjs
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        // If user does not exist create new
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
        })
        // Creating JWT authtoken with user ID using jsonwebtoken
        const data = {
            user: {
                id: user.id,
            }

        }
        const authToken = jwt.sign(data, JWT_SECRET)
        // console.log(jwtData);
        // res.json(user);
        res.json({ authToken })
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error")
    }



    // .then(user => res.json(user))
    // .catch(err => {
    //     console.log(err)
    //     res.json({
    //         error: 'Please refer error message', message: err.message
    //     })
    // })

})

/* *************************************************************** */

// ROUTE:2 - Authenticate user. No login required. /api/auth/login
router.post("/login", [
    // Validating User inputs using expres-validator

    body('email', 'Enter valid email').isEmail(),
    body('password', 'Password can not be blank').exists(),
], async (req, res) => {

    // If error return bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            // We are sending this msg because we dont want to let user to know if user exist or password is wrong
            return res.status(400).json({ error: "Please login with correct credentials!" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please login with correct credentials!" })
        }
        const data = {
            user: {
                id: user.id,
            }

        }
        const authToken = jwt.sign(data, JWT_SECRET)
        res.json({ authToken })


    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error")
    }
}
)

/* *************************************************************** */

// ROUTE:3 - Get logged in user data, Login Required, /api/auth/getuser
router.post("/getuser", fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error")
    }

})


export default router;




// router.post("/", [
//     body('name', 'Enter valid name').isLength({ min: 3 }),
//     body('email', 'Enter valid email').isEmail(),
//     body('password', 'Enter valid password').isLength({ min: 5 }),
// ], (req, res) => {
//     // console.log(req.body);
//     // const user = User(req.body);
//     // const userCreated = user.save();
//     // if (userCreated) {
//     //     res.json("User Created Successfully!")
//     // } else {
//     //     res.json("Something went wrong,Please try again!")
//     // }

//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
//     User.create({
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password,
//     }).then(user => res.json(user))
//         .catch(err => {
//             console.log(err)
//             res.json({
//                 error: 'Please refer error message', message: err.message
//             })
//         })

// })}