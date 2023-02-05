const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./swagger.json");
require("dotenv").config();
const db = require("./config/config").get(process.env.NODE_ENV);
const app = express();
mongoose.connect(db.MONGO_URL);
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

const SWAGGER_DOC = `http://localhost:3001}/api-docs`;
app.listen(db.PORT || 3001, () => {
  console.log(`API DOCUMENTATIONS: ${SWAGGER_DOC}`);
  console.log("The server started on port: ", 3001);
});
