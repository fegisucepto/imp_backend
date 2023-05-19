/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
const models = require('../models')

const { User } = models

function checkPassword(password, { req }) {
  if (password) {
    const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/
    if (password.length < 8 || !reg.test(password)) {
      throw Error('Password minimal 8 karakter, ada kombinasi huruf besar, huruf kecil dan angka')
    }
  }

  return true
}

function checkPasswordConfirm(passwordConfirmation, { req }) {
  if (passwordConfirmation !== req.body.password) {
    throw Error(req.t('validator.same_value', { field: req.t('field.user.password_konfirm') }))
  }

  return true
}

async function emailNotExist(email, { req }) {
  const user = await User.findOne({
    where: {
      email,
    },
  })

  if (user) {
    throw Error(req.t('validator.exist', { field: req.t('field.user.email') }))
  }

  return true
}

module.exports = [checkPassword, emailNotExist,checkPasswordConfirm]
