const Joi = require('joi');

const ValidationMiddleware = async (req, res, next) =>{
    const payLoad = req.body;
    try{
        await userValidator.validateAsync(payLoad);
        next()
    }
    catch(err){
        return res.status(422).send({ errors: err.details[0].message})
    }
}


const userValidator = Joi.object({

    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com'] } })
    .required(),

    firstName: Joi.string()
        .required(),

    lastName: Joi.string()
        .required(),

    password: Joi.string()
        // .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),

    phone: Joi.string()
        .required(),
    
})


module.exports = ValidationMiddleware;