const { checkSchema, validationResult } = require("express-validator"); // to validate shemas
const { ObjectId } = require("mongodb");

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
      next();
    },
  ];
};

// to validate ObjectId
const validateId = (req, res, next) => {
  const id = req.params.id; // access the id from the route parameter (id)

  try {
    const userId = new ObjectId(id); // try to create a new ObjectId
    // store the userId in the request object if it's needed in the controller function
    req.userId = userId;
    next();
  } catch (error) {
    // catch the error thrown when the ObjectId is invalid and send it to the user in json format
    res.status(400).json({ message: "Invalid Id" });
  }
};



module.exports = { 
  validate,
  validateId
};