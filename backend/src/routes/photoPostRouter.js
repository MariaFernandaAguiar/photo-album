const express = require("express");
const controller = require("./controllers/photoPostController");
const { verifyToken } = require("./midllewares/verifyToken");

const photoPostRouter = express.Router();

photoPostRouter.get("/", verifyToken, controller.findAll);
photoPostRouter.get("/:postId", verifyToken, controller.findOne);
photoPostRouter.post("/", verifyToken, controller.create);
photoPostRouter.put("/:postId", verifyToken, controller.update);
photoPostRouter.delete("/:postId", verifyToken, controller.delete);

module.exports = photoPostRouter;
