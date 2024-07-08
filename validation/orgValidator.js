const Joi = require('joi');

const ValidationMiddleware = async (req, res, next) =>{
    const payLoad = req.body;
    try{
        await orgValidator.validateAsync(payLoad);
        next()
    }
    catch(err){
        return res.status(422).send({ errors: err.details[0].message})
    }
}


const orgValidator = Joi.object({

    name: Joi.string()
        .required(),

    description: Joi.string()
        .required(),
    
})


module.exports = ValidationMiddleware;