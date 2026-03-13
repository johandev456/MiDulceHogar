import prisma from "../lib/prisma.js"
import bcrypt from "bcrypt"
export const addMessage = async (req,res)=>{
    const tokenUserId = req.userId;
    const chatId = req.params.chatId;
    const text = req.body.text;
    
    try{
        //se encuentra y revisa si el chat existe y pertenece al usuario actual.
        const chat = await prisma.chat.findUnique({
          where: { id:chatId,
            userIDs:{
                hasSome:[tokenUserId],
            }}
        });
      
        if(!chat) return res.status(404).json({message: "Chat not found!"})
            //se manda el mensaje
        const message = await prisma.message.create({
            data:{
                text,
                chatId,
                userId:tokenUserId
            }
        })
        // Como se mando un mensaje automaticamente paso a ser el ultimo que vio el ultimo
        //tambien se actualiza el ultimo mensaje acorde 
        await prisma.chat.update({
            where:{
                id:chatId,
            },
            data:{
                seenBy: [tokenUserId],
                lastMessage: text,
            }
        })
        
        res.status(200).json(message)
    }catch (error){
        console.log(error)
        res.status(500).json({message:"Failed to send message!"})
    }
}
