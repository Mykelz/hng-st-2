const User = require('../models/user');
const Organization = require('../models/org')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.registerUser = async (req, res, next) => {
    try{
        const { firstName, lastName, email, password, phone } = req.body;

        const userEx = await User.findOne({ where: { email: email } });
        if(userEx){
            const error = new Error('User with the email already exits.')
            error.statusCode = 400;
            throw error
        }
        const hashedPw = await bcrypt.hash(password, 12);

        const user = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPw,
            phone: phone
        })

        const organization = await Organization.create({
          name: `${firstName}'s Organisation`,
          description: '',
        });
    
        await user.addOrganization(organization);
        
        console.log(user, 'user details')

        res.status(201).json({
            status: "success",
            message: "Registration successful",
            data:  user

        })
    }catch(err){
        if (!err.statusCode){
            err.statusCode = 500;
        }
        next(err);

    }
}


exports.loginUser = async (req, res, next)=>{
    try{
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email: email } });
    
        if (!user){
            const error = new Error('No user is associated with this email');
            error.statusCode = 401;
            throw error;
        }
    
       const isEqual = await bcrypt.compare(password, user.password)
       if(!isEqual){
            const error = new Error('Wrong password')
            error.statusCode = 401;
            throw error;
       }
       const token = jwt.sign(
        { email: user.email, userId: user.id},
        process.env.JWT_SECRET,
        { expiresIn: '1hr'}
      );
      res.status(200).json({
        status: "success",
        message: 'Login Successfull',
        data: {
            accessToken: 'Bearer ' + token,
            user: user
            }
        })
    }catch(err){
        if (!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
}