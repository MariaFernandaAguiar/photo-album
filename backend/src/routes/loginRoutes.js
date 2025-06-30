const express = require("express");
const controller = require("./controllers/loginController");
const loginRouter = express.Router();
const { validateLoginId } = require("./validators/LoginValidator");
const { verifyToken } = require("./midllewares/verifyToken");

loginRouter.post("/", controller.login);
loginRouter.post("/register", controller.create);
loginRouter.get("/:loginId", verifyToken, validateLoginId, controller.findOne);
loginRouter.get("/count/:loginId", verifyToken, validateLoginId, controller.findCount);
loginRouter.put("/:loginId", verifyToken, validateLoginId, controller.update);
loginRouter.put(
  "/unnactive/:loginId",
  verifyToken,
  validateLoginId,
  controller.unnactive
);
loginRouter.delete(
  "/:loginId",
  verifyToken,
  validateLoginId,
  controller.delete
);

module.exports = loginRouter;
