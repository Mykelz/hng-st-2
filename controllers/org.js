
const User = require('../models/user');
const Organization = require('../models/org')

exports.getUserDetails = async(req,res, next) =>{
    try{
        const userId = req.params.id;
        const user = await User.findOne({ where: {id: userId}});

        res.status(200).json({
            status: "success",
            message: "user details",
            data: user
        })
    }catch(err){
        if (!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getUserOrg = async(req, res, next) =>{
    try{
        const user = await User.findByPk(req.user)
        const userOrg = await user.getOrganizations();
        
        res.status(200).json({
            status: "success",
            message: "User Organization",
            data: userOrg
        })

    }catch(err){
        if (!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getASingleOrg = async(req, res, next) =>{
    try{
        const orgId = req.params.orgId;
        const org = await Organization.findByPk(orgId);

        res.status(200).json({
            status: "success",
            message: "Single Organization",
            data: org
        })

    }catch(err){
        if (!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.createOrg = async(req, res, next) =>{
    try{
        const user = await User.findByPk(req.user);
        const { name, description } = req.body;
    
        const org = await user.createOrganization({
            name,
            description,
          });
      
        res.status(201).json({
            status: "success",
            message: "Organisation created successfully",
            data: org
        })

    }catch(err){
        if (!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.addUserToOrg = async (req, res, next) =>{
    try{
        const userId = req.body.userId;
        const orgId = req.params.orgId;
        const organisation = await Organization.findByPk(orgId)
        const user = await User.findByPk(userId)
        const addUser = await organisation.addUser(user)

        res.status(200).json({
                status: "success",
                message: "User added to organisation successfully",
        })
    }catch(err){
        if (!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
}
