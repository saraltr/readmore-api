const userSchema = {
  username: {
    in: ["body"],
    exists: {
      errorMessage: "username is required",
      options: { checkFalsy: true },
    },
    isLength: {
      options: { min: 2 },
      errorMessage: "Username should be at least 2 characters long",
    },
    isString: {
      errorMessage: "Username should be a string",
    },
  },
  email: {
    in: ["body"],
    exists: {
      errorMessage: "email is required",
      options: { checkFalsy: true },
    },
    isEmail: {
      errorMessage: "Invalid email address",
    },
  },
  firstName: {
    in: ["body"],
    exists: {
      errorMessage: "First Name is required",
      options: { checkFalsy: true },
    },
    isString: {
      errorMessage: "First name should be a string",
    },
  },
  lastName: {
    in: ["body"],
    exists: {
      errorMessage: "Last name is required",
      options: { checkFalsy: true },
    },
    isString: {
      errorMessage: "Last name should be a string",
    },
  }
};
  
module.exports = {
    userSchema
};
  