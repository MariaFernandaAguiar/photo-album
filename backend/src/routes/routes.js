const express = require("express");
const router = express.Router();
const loginRouter = require("./loginRoutes");
const photoPostRouter = require("./photoPostRouter");

router.use("/login", loginRouter);
router.use("/photos", photoPostRouter);

module.exports = router;
