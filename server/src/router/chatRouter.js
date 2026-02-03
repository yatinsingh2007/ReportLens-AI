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
const fs = require("fs");
const path = require("path");
const chatRouter = express.Router();
const uploadDir = path.join(__dirname, "../../uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

chatRouter.post("/fileUpload", upload.single("file"), fileUpload);
chatRouter.get("/getAllChatIds", getAllChatIds);
chatRouter.get("/messages/:roomId", getMessages);
chatRouter.post("/upload/message/:roomId", uploadMessage);
chatRouter.post("/create", createChat);
chatRouter.post("/userQuery", userQuery);
chatRouter.post("/fileUpload", upload.single("file"), fileUpload);

module.exports = chatRouter;
