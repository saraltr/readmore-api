const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "Bookclub Api",
        description: "Bookclub app"
    },
    host: "read-list-api.onrender.com",
    schemes: ["https"]
};

const output = "./routes/swagger.json"; // output Swagger JSON file
const endpoint = ["./routes/index.js"]; 

// generate swagger.json
swaggerAutogen(output, endpoint, doc);