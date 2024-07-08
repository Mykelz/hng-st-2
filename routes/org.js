const express = require('express');
const orgController = require('../controllers/org');
const isAuth = require('../middleware/isAuth')
const orgValidation = require('../validation/orgValidator')

const router = express.Router();

//POST/api/route

router.get('/users/:id', isAuth, orgController.getUserDetails)

router.get('/organisations', isAuth, orgController.getUserOrg);

router.get('/organisations/:orgId', isAuth, orgController.getASingleOrg);

router.post('/organisations', orgValidation, isAuth, orgController.createOrg)

router.post('/organisations/:orgId/users', isAuth, orgController.addUserToOrg)



module.exports = router;