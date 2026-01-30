require("dotenv").config();
const express = require("express");
const { prisma } = require("./db/dbConfig");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { authMiddleware } = require("./middlewares/authMiddleware");
const authRouter = require("./router/authRouter");
const chatRouter = require("./router/chatRouter");
const dashboardRouter = require("./router/dashboardRouter");

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/chat", authMiddleware, chatRouter);
app.use("/api/dashboard", authMiddleware, dashboardRouter);

async function main() {
  await prisma.$connect();
  console.log("Database connected");
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}

main()
  .catch((e) => {
    console.error(e);
    console.log("Database Connection failed");
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
