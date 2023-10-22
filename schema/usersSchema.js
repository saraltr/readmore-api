// user schema
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
    password: {
      in: ["body"],
      exists: {
        errorMessage: "password is required",
        options: { checkFalsy: true },
      },
      isLength: {
        options: { min: 5 },
        errorMessage: "Password should be at least 5 characters long",
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
    },
    birthday: {
        in: ["body"],
        exists: {
          errorMessage: "Birthday required",
          options: { checkFalsy: true },
        },
        isString: true,
        custom: {
          options: (value) => {
            const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
            if (!dateFormatRegex.test(value)) {
              throw new Error("Birthday should be in the format YYYY-MM-DD");
            }
            return true; // validation passed
          },
        },
    }
};
  
module.exports = {
    userSchema
};
  