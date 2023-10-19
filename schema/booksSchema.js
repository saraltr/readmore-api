// add book schema 
const addBookSchema = {
    title: {
        in: ["body"],
        exists: {
        errorMessage: "Title is required",
        options: { checkFalsy: true },
        },
        isString: {
        errorMessage: "Title should be a string",
        },
    },
    author: {
        in: ["body"],
        exists: {
        errorMessage: "Author is required",
        options: { checkFalsy: true },
        },
        isString: {
        errorMessage: 'Author should be a string',
        },
    },
    genre: {
        in: ["body"],
        exists: {
        errorMessage: "Genre is required",
        options: { checkFalsy: true },
        },
        isString: {
        errorMessage: "Genre should be a string",
        },
    },
    nationality: {
        in: ["body"],
        exists: {
        errorMessage: "Nationality is required",
        options: { checkFalsy: true },
        },
        isString: {
        errorMessage: "Nationality should be a string",
        },
    },
    year_of_publication: {
        in: ["body"],
        isInt: {
        errorMessage: "Year of publication should be an integer"
        }
    }
};

module.exports = {
    addBookSchema
};