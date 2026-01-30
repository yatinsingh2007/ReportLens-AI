const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { prisma } = require("../db/dbConfig");
const {
  validateName,
  validateEmail,
  validatePassword,
} = require("../utils/validations/credentials");

const login = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (
      !validateName(name) ||
      !validateEmail(email) ||
      !validatePassword(password)
    ) {
      return res.status(400).json({ error: "Incorrect Format of Credentials" });
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res
      .status(200)
      .cookie("token", token, { httpOnly: true })
      .json({ message: "Login successful" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (
      !validateName(name) ||
      !validateEmail(email) ||
      !validatePassword(password)
    ) {
      return res.status(400).json({ error: "Incorrect Format of Credentials" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    if (err.code === "P2002") {
      return res.status(409).json({ error: "User already exists" });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const logout = (req, res) => {
  return res
    .cookie("token", null, { httpOnly: true, expires: new Date(Date.now()) })
    .status(200)
    .json({ message: "Logout successful" });
};

module.exports = {
  login,
  signup,
  logout,
};
