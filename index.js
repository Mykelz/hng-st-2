const express = require('express');
const sequelize = require('./config/database');
const User = require('./models/user');
const Organization = require('./models/org');
const userRoute = require('./routes/user');
const orgRoute = require('./routes/org');
require('dotenv').config();

const app = express();


app.use(express.json());



app.use('/auth', userRoute);
app.use('/api', orgRoute);

app.use((error, req, res, next) =>{
    const data = error.data;
    const status = error.statusCode || 500;
    const message = error.message || 'an error occcured';
    res.status(status).json({ message: message, data: data})
  })

const UserOrg = sequelize.define('UserOrganization', {});


User.belongsToMany(Organization, { through: UserOrg });
Organization.belongsToMany(User, { through: UserOrg });

// 


sequelize.sync()
.then(result=>{
    // console.log(result)
  console.log('postgres connection established')
  app.listen(process.env.PORT,()=>{
    console.log('app is listening @ port ' + process.env.PORT) 
  })
})
.catch(err=>{
  console.log(err)
})



module.exports = app;

// "firstName": "jeliil",
// "lastName": "ada",
// "email": "odj@gmail.com",
// "password": "password",
// "phone": "090112345"