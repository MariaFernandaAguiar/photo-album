const express = require("express");
const router = express.Router();
const loginRouter = require("./loginRoutes");

router.use("/login", loginRouter);

module.exports = router;
