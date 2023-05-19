'use strict';
const Controller = require('../controllers/index');
const express = require('express');
const router = express.Router();
const authentication = require('../middlewares/authentication');
// // const validate = require('../validators')
// const { createValidator } = require('../validators/userValidator')


router.post('/register',Controller.registrasi);
router.post('/login', Controller.login);

router.use(authentication);

router.use('/user', require('./home.js'));

module.exports = router;