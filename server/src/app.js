require('dotenv').config();
const express = require('express');
const { prisma } = require("./db/dbConfig");
const { auth } = require("./auth/auth");
const cors = require("cors");
const cookieParser = require("cookie-parser");


const app = express();

app.use(cookieParser());

app.use(cors({
    origin : "http://localhost:3001" ,
    credentials : true
}));

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