var express = require("express");
var router = express.Router();
let userRoutes = require("./UserRoute");
let authRoutes = require("./AuthRoutes");

let rootRouter = router;

rootRouter.use("/user", userRoutes);
rootRouter.use("/auth", authRoutes);

module.exports = rootRouter;
