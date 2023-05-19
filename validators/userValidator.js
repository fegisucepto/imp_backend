const { body } = require('express-validator')
const {
  emailNotExist
} = require('./customValidator')

const password = [
  body('password')
    .notEmpty().withMessage((value, { req }) => req.t('validator.not_empty', { field: req.t('field.user.password') }))
    .isLength({ min: 8 })
    .withMessage((value, { req }) => req.t('validator.password', { field: req.t('field.user.password') })),
]

const general = [
  body('firstname')
    .notEmpty().withMessage((value, { req }) => req.t('validator.not_empty', { field: req.t('field.user.firstname') }))
    .isString()
    .withMessage((value, { req }) => req.t('validator.string', { field: req.t('field.user.firstname') })),
  body('lastname')
    .notEmpty().withMessage((value, { req }) => req.t('validator.not_empty', { field: req.t('field.user.lastname') }))
    .isString()
    .withMessage((value, { req }) => req.t('validator.string', { field: req.t('field.user.lastname') })),
  body('email')
    .notEmpty().withMessage((value, { req }) => req.t('validator.not_empty', { field: req.t('field.user.email') }))
    .isEmail()
    .withMessage((value, { req }) => req.t('validator.email', { field: req.t('field.user.email') })),
]

const createValidator = [
  ...general,
  ...password,
  body('email')
    .custom(emailNotExist),
]

module.exports = createValidator
