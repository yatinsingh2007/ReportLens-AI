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


chat.get("/getAllChatIds" , async (req , res) => {
    try{
        const userId = req.user.id;
        if (!userId){
            return res.status(401).json({
                "error" : "Unauthorized"
            })
        }
        const chatIds = await prisma.chat.findMany({
            where : {
                userId
            } ,
            select : {
                id : true
            } ,
            orderBy : {
                createdAt : "desc"
            }
        });
        if (chatIds.length === 0){
            return res.status(404).json({
                "error" : "Not Found"
            })
        }
        return res.status(200).json(chatIds)
    }catch(err){
        console.log(err);
        return res.status(500).json({
            "error" : "Internal Server Error"
        })
    }
});

chat.get('/messages/:roomId' , async (req , res) => {
    try{
        const { roomId } = req.params;
        if (!roomId){
            return res.status(400).json({
                "error" : "roomId is required"
            });
        }
        const messages = await prisma.message.findMany({
            where : {
                chatId : roomId
            } ,
            orderBy : {
                createdAt : "desc"
            }
        });
        return res.status(200).json(messages)
    }catch(err){
        console.log(err);
        return res.status(500).json({
            "error" : "Internal Server Error"
        })
    }

});


chat.post('/upload/message/:roomId' , async (req , res) => {
    try{
        const { roomId } = req.params;
        const { query } = req.body;
        if (!roomId){
            return res.status(400).json({
                "error" : "RoomId is required"
            })
        }
        const resp = await model.generateContent(query);
        return res.status(200).json({
            response : resp.response.text()
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            "error" : "Internal Server Error"
        })
    }
})

module.exports = { chat };
