const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./swagger.json");
require("dotenv").config();
const app = express();
mongoose.connect(process.env.MONGO_URL);
const database = mongoose.connection;
database.on("error", (error) => {
  console.log("error");
});
database.once("connected", () => {
  console.log("The MongoDb database connection success!");
});
app.use(cors());
app.use(express.json());
const routes = require("./route/route");
app.use("/", routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
const SWAGGER_DOC = `http://localhost:${process.env.PORT}/api-docs`;
app.listen(process.env.PORT, () => {
  console.log(`API DOCUMENTATIONS: ${SWAGGER_DOC}`);
  console.log("The server started on port: ", process.env.PORT);
});
