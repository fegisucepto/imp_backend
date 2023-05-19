const { body } = require('express-validator')

const email = [
  body('email')
    .notEmpty().withMessage((value, { req }) => req.t('validator.not_empty', { field: req.t('field.user.email') }))
    .isEmail()
    .withMessage((value, { req }) => req.t('validator.email', { field: req.t('field.user.email') })),
]

const password = [
  body('password')
    .notEmpty().withMessage((value, { req }) => req.t('validator.not_empty', { field: req.t('field.user.password') }))
    .isLength({ min: 8 })
    .withMessage((value, { req }) => req.t('validator.password', { field: req.t('field.user.password') })),
]

const loginValidator = [
  ...email,
  ...password,
]

module.exports = loginValidator
