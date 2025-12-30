require('dotenv').config();
const express = require('express');

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
})

module.exports = { chat };
