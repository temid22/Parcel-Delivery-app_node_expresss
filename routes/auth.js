import express from "express";
import User   from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const router = express.Router();

// REGISTER
router.post('/register', async (req, res) => {

        if (req.body.username === '' || req.body.username === null,
            req.body.email === '' || req.body.email === null,
            req.body.password === '' || req.body.password === null
            ){
                res.status(400).json(`Thats rude, enter your username, email and password...`)
            };

            
    const newUser = new User({
        username: req.body.username,
        email: req.body.email, 
        password: req.body.password
    });
 try   {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
}   catch (err) {
    res.status(500).json(err);
};
});

// LOGIN

router.post('/login', async (req, res) => {
    try{
        const user = await User.findOne({username: req.body.username});
        if (user) {
        
        const hashedPassword = await bcrypt.compare(req.body.password, user.password);
        
        const { password, ...others } = user._doc;
        
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        }, process.env.JWT_SEC,
        {
            expiresIn: "1d"
        })

        if (hashedPassword) {
            res.status(200).send({ ...others, accessToken, message: `Valid password` });
          } else {
            res.status(400).send(`Invalid Password!`);
          }
        } else {
          res.status(401).send(`User does not exist!`);
        }




    }catch(err){
        res.status(500).send(err)
    }
})




export default router;