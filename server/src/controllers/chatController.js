const { prisma } = require("../db/dbConfig");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");

const generativeAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = generativeAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const fileUpload = async (req, res) => {
  try {
    console.log(req.file);
    // Implement file processing logic if needed
    return res.status(200).json({ message: "File uploaded successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const getAllChatIds = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }
    const chatIds = await prisma.chat.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    if (chatIds.length === 0) {
      return res.status(404).json({
        error: "Not Found",
      });
    }
    return res.status(200).json(chatIds);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const getMessages = async (req, res) => {
  try {
    const { roomId } = req.params;
    if (!roomId) {
      return res.status(400).json({
        error: "roomId is required",
      });
    }
    const messages = await prisma.message.findMany({
      where: {
        chatId: roomId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json(messages);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const uploadMessage = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { query } = req.body;
    if (!roomId) {
      return res.status(400).json({
        error: "RoomId is required",
      });
    }
    const resp = await model.generateContent(query);
    return res.status(200).json({
      response: resp.response.text(),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const createChat = async (req, res) => {
  try {
    const id = req.user.id;
    await prisma.chat.create({
      data: {
        userId: id,
      },
    });
    return res.status(201).json({
      message: "chat created successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const userQuery = async (req, res) => {
  try {
    const id = req.user.id;
    const { query, chatId } = req.body;
    if (!id) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }
    if (!query || !chatId) {
      return res.status(400).json({
        error:
          "User did not Provide any Input or question to ask or No ChatRoom Identification.",
      });
    }
    const chatRoom = await prisma.chat.findUnique({
      where: {
        id: chatId,
      },
    });
    if (!chatRoom) {
      return res.status(404).json({
        error: "No such ChatRoom exists",
      });
    }
    await prisma.chat.create({
      data: {
        messages: {
          create: {
            content: query,
            role: "User",
            chatId: chatId,
          },
        },
      },
    });

    const data = await fs.promises.readFile(
      path.join(__dirname, "..", "prompts", "queryPrompt.txt"),
      "utf-8",
    );
    const content = data.replace("{{user_question}}", query.trim());
    const response = await model.generateContent(content);
    const resp = response.response.text();
    await prisma.chat.create({
      data: {
        messages: {
          create: {
            content: resp,
            role: "AI",
            chatId: chatId,
          },
        },
      },
    });
    const messages = await prisma.chat.findUnique({
      where: {
        id: chatId,
      },
      include: {
        messages: true,
      },
    });
    return res.status(200).json(messages);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

module.exports = {
  fileUpload,
  getAllChatIds,
  getMessages,
  uploadMessage,
  createChat,
  userQuery,
};
