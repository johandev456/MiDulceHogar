import prisma from "../lib/prisma.js"

export const getChats = async (req,res)=>{
    const tokenUserId = req.userId;


    
    try{
        const chats = await prisma.chat.findMany({
            where:{
                userIDs:{
                    hasSome:[tokenUserId]
                }
            }
        })
        
        for(const chat of chats){
            const receiverId = chat.userIDs.find(id=>id !== tokenUserId)
            const receiver = await prisma.user.findUnique({
                where:{
                    id:receiverId
                },
                select:{
                    id:true,
                    avatar:true,
                    username:true,
                }
            });
            chat.receiver = receiver;
        }
        res.status(200).json(chats)
    }catch (error){
        console.log(error)
        res.status(500).json({message:"Failed to get chats!"})
    }
}

export const getChat = async (req,res)=>{
            const tokenUserId = req.userId;

    try{
        const chats = await prisma.chat.findUnique({
            where:{
                id:req.params.id,
                userIDs:{
                    hasSome:[tokenUserId]
                }
            },
            include:{
                messages:{
                    orderBy:{
                        createdAt: "asc"
                    }
                }
            }
        })

        await prisma.chat.update({
            where:{
                id:req.params.id
            },
            data:{
                seenBy:{
                    push:[tokenUserId]
                }
            }

        })
        if(chats) {
            res.status(200).json(chats)
        }else{
            res.status(403).json({message: "Not found"})
        }
           
        
    }catch (error){
        console.log(error)
        res.status(500).json({message:"Failed to get chat!"})
    }
}

export const addChat = async (req,res)=>{
    const tokenUserId = req.userId
    const otherUserId = req.body.userIDs[1]
    try{
        const existingChat = await prisma.chat.findFirst({
            where: {
                userIDs: {
                hasEvery: [tokenUserId, otherUserId],
                },
            },
            });
        if(!existingChat) {
        const newChat = await prisma.chat.create({
                    data:{
                        userIDs:[tokenUserId,req.body.userIDs[1]] 
                    }
        })
        res.status(200).json(newChat)
        }else{
            
            res.status(200).json({message: "Chat already exists!"})
        }
        
    }catch (error){
        console.log(error)
        res.status(500).json({message:"Failed to add chats!"})
    }
}

export const readChat = async (req,res)=>{
    const tokenUserId = req.userId;

    try{
        const chat = await prisma.chat.update({
            where:{
                id:req.params.id,
                userIDs:{
                    hasSome:[tokenUserId]
                }
            },
            data:{
                seenBy:{
                    push:[tokenUserId]
                }
            }
        })
        res.status(200).json(chat)
    }catch (error){
        console.log(error)
        res.status(500).json({message:"Failed to read chats!"})
    }
}

export const deleteChat =async (req,res)=>{
    const tokenUserId= req.userId;
    const id= req.params.id
    try{
        await prisma.chat.delete({
        where:{
            id
        }
    })
    res.status(204).json({message:"Chat deleted succesfully!"})
    }catch (err){
        console.log(err)
        res.status(500).json({message:"Failed to delete chats!"})
    }
    
    
}