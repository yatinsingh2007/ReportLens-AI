require('dotenv').config();
const express = require('express');
const { prisma } = require("../prisma/dbConfig");
const { auth } = require("./auth/auth");


const app = express();


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