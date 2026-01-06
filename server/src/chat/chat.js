require('dotenv').config();
const express = require('express');

const { prisma } = require('../db/dbConfig');

const { GoogleGenerativeAI } = require('@google/generative-ai');

const multer = require("multer");

const fs = require('fs');

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
                id : true ,
                createdAt : true
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
});

chat.post('/create' , async (req , res) => {
    try{
        const id = req.user.id;
        const data = await prisma.chat.create({
            data : {
                userId : id
            }
        });
        return res.status(201).json({
            "message" : "chat created successfully"
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            "error" : "Internal Server Error"
        })
    }
});


chat.post('/userQuery' , async (req , res) => {
    try{
        const id = req.user.id;
        const { query , chatId } = req.body;
        if (!id){
            return res.status(401).json({
                "error" : "Unauthorized"
            })
        }
        if (!query || !chatId){
            return res.status(400).json({
                "error" : "User did not Provide any Input or question to ask or No ChatRoom Identification."
            })
        }
        const chatRoom = await prisma.chat.findUnique({
            where : {
                chatId : chatId ,
                userId : id
            }
        })
        if (!chatRoom){
            return res.status(404).json({
                "error" : "No such ChatRoom exists"
            })
        }
        await prisma.chat.create({
            messages : {
                create : {
                    content : query,
                    role : "User" ,
                    chatId : chatId
                }
            }
        });

        const data = await fs.promises.readFile("./prompts/queryPrompt.txt" , "utf-8");
        const content = data.replace("{{user_question}}" , query);
        const response = await model.generateContent(content);
        const resp = response.response.text();
        await prisma.chat.create({
            messages : {
                create : {
                    content : resp,
                    role : "Assistant" ,
                    chatId : chatId
                }
            }
        });
        return res.status(200).json({
            response : resp
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            "error" : "Internal Server Error"
        })
    }
})

module.exports = { chat };
