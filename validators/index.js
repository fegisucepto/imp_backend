const { validationResult } = require('express-validator');
const errorResponse = require('../helpers/errorResponse');

function validate(validations) {
  return async (req, res, next) => {
    try {
      await Promise.all(validations.map((validation) => validation.run(req)));

      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }

      const extractedErrors = {};
      errors.array().forEach((value) => {
        if (!value.param) return;

        if (!extractedErrors[value.param]) extractedErrors[value.param] = [value.msg];
        else extractedErrors[value.param].push(value.msg);
      });

      const firstMessageError = Object.values(extractedErrors)[0][0];
      return res.status(422).json(errorResponse(firstMessageError, extractedErrors));
    } catch (err) {
      console.error(err); // Tampilkan kesalahan di konsol untuk debug
      return res.status(500).json(errorResponse('Internal Server Error'));
    }
  };
}

module.exports = validate;
