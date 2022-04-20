const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { userRoutes, itemRoutes, orderRoutes, bookingRoutes } = require("./routes");
const errorMiddleware = require("./middlewares/errorMiddleware");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    // limit: "50mb",
    extended: true,
    // parameterLimit: 50000,
  })
);
app.use(fileUpload());

app.use("/api/v1/ums", userRoutes);
app.use("/api/v1/ims", itemRoutes);
app.use("/api/v1/oms", orderRoutes);
app.use("/api/v1/bms", bookingRoutes);

app.use(errorMiddleware);

module.exports = app;
