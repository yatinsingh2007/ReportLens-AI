require("dotenv").config();
const jwt = require("jsonwebtoken");
const { prisma } = require("../../db/dbConfig");
const authMiddleware = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userData = await prisma.user.findUnique({
        where : {
            id : decoded.id
        }
    });
    if(!userData){
        return res.status(401).json({ error: "Unauthorized" });
    }
    req.user = userData;
    next();
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { authMiddleware };
