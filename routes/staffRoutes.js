const express = require('express');
const app = express();
const router = express.Router();
const upload = require('../multermiddleware/multer');
const jwt = require('jsonwebtoken');

const blogSchema = require('../model/blogSchema');
const staffSchema = require('../model/staffSchema')

router.post('/login', async (req, res,next) => {
    const n = req.body.name;
    const p = req.body.password;
    const user = await staffSchema.findOne({ name: n, password: p });
    if (user.password === req.body.password) {
        if (user.role === 'User') {
            res.json({
                message: 'NOT ALLOWED'
            });
        }
        else {
           const token= jwt.sign({user_id:user._id}, "secretkey", { expiresIn: '60s' });
            res.json({
                token
            });
        }
    }
})

router.post('/register', upload, async (req, res) => {
    const staff = new staffSchema({
        name: req.body.name,
        password: req.body.password,
        role: req.body.role
    })
    try {
        const savedstaff = await staff.save()
        res.json(savedstaff);
    } catch (err) {
        res.json({ message: err })
    }
})
module.exports = router