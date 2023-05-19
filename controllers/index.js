const { User } = require('../models');
const jwt = require('jsonwebtoken')
const { checkHash } = require('../helpers/password');
const errorResponse = require('../helpers/errorResponse')
const crypto = require('crypto');

class Controller {
  static async registrasi(req, res, next) {
    try {
      const { email, password, firstname, lastname } = req.body;
  
      // Validasi email
      if (!isValidEmail(email)) {
        return res.status(422).json(errorResponse('Email tidak valid'));
      }
  
      // Check if email already exists
      const existingUser = await User.findOne({
        where: {
          email: email.toLowerCase(), // Convert email to lowercase for case-insensitive comparison
        },
      });
  
      if (existingUser) {
        return res.status(422).json(errorResponse('Email sudah terdaftar'));
      }
  
      // Validasi password
      if (!isValidPassword(password)) {
        return res.status(422).json(errorResponse('Password harus memiliki minimal 10 karakter'));
      }

      // Validasi name
      if (!isNameFull(lastname,firstname)) {
        return res.status(422).json(errorResponse('Name harus memiliki minimal 2 karakter'));
      }
  
      const createUser = await User.create({
        uuid: crypto.randomUUID(),
        email,
        password,
        firstname,
        lastname,
      });
  
      res.status(201).json({
        statusCode: 201,
        data: createUser,
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
  
  static async login(req, res, next) {
    try {
      const data = req.body;
      const user = await User.findOne({
        where: {
          email: data.email,
        },
        attributes: [...User.getBasicAttribute(), 'password'],
      });

      if (!user || !checkHash(data.password, user.password)) {
        return res.status(400).json(errorResponse('Email atau password Anda tidak ditemukan'));
      }
      if (!user) {
        return res.status(403).json(errorResponse('Akun anda di blokir'));
      }

      const userData = user.dataValues;
      const payload = {
        id: userData.id,
        email: userData.email,
      };
      const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '3d' });
      delete userData.password;
      userData.token = token;

      return res.status(200).json(userData);
    } catch (err) {
      return next(err);
    }
  }
}

const isValidEmail = (email) => {
  return email.includes('@');
};

const isValidPassword = (password) => {
  return password.length >= 10;
};

const isNameFull = (firstname,lastname) => {
  return firstname.length && lastname.length >= 2
}

module.exports = Controller;