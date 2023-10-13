const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "Read More Api",
        description: "To read list api"
    },
    host: "read-list-api.onrender.com",
    schemes: ["https"]
};

const output = "./routes/swagger.json"; // output Swagger JSON file
const endpoint = ["./routes/index.js"]; 

// generate swagger.json
swaggerAutogen(output, endpoint, doc);