// to validate shemas
const { checkSchema, validationResult } = require("express-validator");

// create a middleware function for validating schemas
const validate = (schema) => {
  return [
    checkSchema(schema),
    (req, res, next) => {
      const errors = validationResult(req); // retrieve validation errors from the request
      if (!errors.isEmpty()) {
        // if errors are found respond with a 422 unprocessable entity status
        return res.status(422).json({ errors: errors.mapped() }); // structure the errors object
      }

      // if there are no validation errors continue to the next middleware or route handler
      next();
    },
  ];
};

module.exports = validate;