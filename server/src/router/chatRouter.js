const express = require("express");
const multer = require("multer");
const {
  fileUpload,
  getAllChatIds,
  getMessages,
  uploadMessage,
  createChat,
  userQuery,
} = require("../controllers/chatController");

const chatRouter = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
});

chatRouter.post("/fileUpload", upload.single("file"), fileUpload);
chatRouter.get("/getAllChatIds", getAllChatIds);
chatRouter.get("/messages/:roomId", getMessages);
chatRouter.post("/upload/message/:roomId", uploadMessage);
chatRouter.post("/create", createChat);
chatRouter.post("/userQuery", userQuery);

module.exports = chatRouter;
