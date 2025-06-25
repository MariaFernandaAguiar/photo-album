const express = require("express");
const router = express.Router();
const loginRouter = require("./loginRoutes");
const photoPostRouter = require("./photoPostRouter");

router.use("/login", loginRouter);
router.use("/photo-post", photoPostRouter);

module.exports = router;
