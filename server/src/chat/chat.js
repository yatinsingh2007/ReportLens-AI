require('dotenv').config();
const express = require('express');

const { prisma } = require('../db/dbConfig');

const { GoogleGenerativeAI } = require('@google/generative-ai');

const multer = require("multer");

const upload = multer({
    storage : multer.memoryStorage()
})

const generativeAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = generativeAI.getGenerativeModel({
    model : "gemini-2.0-flash-exp"
})



const chat = express.Router();

chat.post('/query' ,  async (req , res) => {
    try{    
        const { filePresent } = req.query;
        if (!filePresent){
            const { question } = req.body;
            if (!question){
                return res.status(400).json({
                    message : "Question is required"
                })
            }
            const content = await model.generateContent(question);
            return res.status(200).json({
                message : content.response.text()
            })
        }
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message : "Internal Server Error"
        })
    }
});


chat.post('/fileUpload' , upload.single("file") ,  async (req , res) => {
    try{
        console.log(req.file);
    }catch(err){
        console.log(err);
        return res.status(500).json({
            "error" : "Internal Server Error"
        })
    }
});

chat.get('/getChat' , async (req , res) => {
    try{
        const ourUser = req.user;
        const userId = ourUser.id;
        const chatRoom = await prisma.chat.findMany({
            where : {
                userId : userId,
            } ,
            orderBy : {
                createdAt : "desc"
            }
        });
        if (!chatRoom){
            const newChat = await prisma.chat.create({
                data : {
                    userId : userId
                }
            });
            return res.status(200).json({
                chatId : newChat.id
            })
        }
        return res.status(200).json({
            chatId : chatRoom.id
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            "error" : "Internal Server Error"
        })
    }
});

chat.get("/getAllChats" , async (req , res) => {
    try{
        const userId = req.user.id;
        if (!userId){
            return res.status(401).json({
                "error" : "Unauthorized"
            })
        }
        const ChatIds = await prisma.user.findMany({
            where : {
                userId
            } ,
            select : {
                id : true
            }
        });
        if (ChatIds.length === 0){
            return res.status(404).json({
                "error" : "Not Found"
            })
        }
        return res.status(200).json(ChatIds)
    }catch(err){
        console.log(err);
        return res.status(500).json({
            "error" : "Internal Server Error"
        })
    }
})

module.exports = { chat };
