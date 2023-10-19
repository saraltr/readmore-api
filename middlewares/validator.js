// to validate shemas
const { checkSchema, validationResult } = require("express-validator");

const validate = (schema) => {
  return [
    checkSchema(schema),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
      }
      next();
    },
  ];
};

module.exports = validate;