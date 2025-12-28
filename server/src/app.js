require('dotenv').config();
const express = require('express');
const { prisma } = require("./db/dbConfig");
const { auth } = require("./auth/auth");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
const upload = multer({
   dest : "uploads/"
})

const fs = require("fs");
const app = express();

app.use(cookieParser());

app.use(cors({
    origin : "http://localhost:3000" ,
    credentials : true
}));

app.post('/api/file/upload' , upload.single("file") , async (req , res) => {
    const filePath = path.resolve(req.file.path)
    const data = await fs.promises.readFile(filePath)
    console.log(data);
    return res.json({message : "File uploaded successfully"})
})

app.use(express.json());

app.use('/api/auth' , auth);

async function main(){
    await prisma.$connect();
    console.log("Database connected");
    app.listen(process.env.PORT , () => {
        console.log(`Server running on port ${process.env.PORT}`);
    })
}

main()
.catch((e) => {
    console.error(e);
    console.log("Database Connection failed")
})
.finally(async () => {
    await prisma.$disconnect();
})