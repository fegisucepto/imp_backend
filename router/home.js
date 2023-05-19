// router/index.js

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/HomeController');

router.get('/', UserController.userList);

module.exports = router;