import prisma from "../lib/prisma.js"
import bcrypt from "bcrypt"

const isValidObjectId = (value) => /^[a-f\d]{24}$/i.test(value)


export const getUsers = async (req,res)=>{
    try{
        const users = await prisma.user.findMany();
        console.log(users)
        return res.status(200).json(users)
    }catch (error){
        console.log(error)
        res.status(500).json({message:"Se fue a pique"})
    }
}
export const getContactInfo = async (req,res)=>{
    try{
        const tokenUserId=req.userId;
        const contact = await prisma.userContact.findUnique({where:{userId:tokenUserId}});
        if(!contact)  return res.status(200).json(false)
        res.status(200).json(contact)
    }catch (error){
        console.log(error)
        res.status(500).json({message:"Se fue a pique"})
    }
}
export const getUser = async (req,res)=>{
    try{
        if(!isValidObjectId(req.params.id)){
            return res.status(400).json({message:"Invalid user id"})
        }

        const user = await prisma.user.findUnique({
            where:{id: req.params.id},
            include:{userContact:true}
        
        });
        
        // if(!user) return res.status(404).json({message: "User not found"})
        res.status(200).json(user)
    }catch (error){
        console.log(error)
        res.status(500).json({message:"Se fue a pique"})
    }
}
export const updateUser = async (req,res)=>{
        
        const id = req.params.id;
        
        const tokenUserId = req.userId;
        const {password,avatar,...inputs} = req.body;
        //Verificacion de seguridad.
        if(id !== tokenUserId && !req.isAdmin) {
            return res.status(403).json({message: "Not authorized"})
        }
        try{
        if(req.body.contact){ //En el caso de que solamente se tenga que actualizar la info de contacto
            const body=req.body.data;
            console.log(body)
            const contact = await prisma.userContact.findUnique({where:{userId:id}})
        console.log(contact)
        
        if(!contact){
            const newContact = await prisma.userContact.create( { data:{...body,userId: id }} )
            console.log(newContact)

            return res.status(200).json({message: "Contact info created!"})
        }else{
            
            const updateContact = await prisma.userContact.update({
                where:{
                userId:id
            },
            data: {...body}
            
            })
            res.status(200).json({message: "Contact info updated!"})

        }
            }
        }catch(error){
                console.log(error)
                res.status(500).json({message:"Failed to create.modify contact information"})

            }


        //En el caso de que se tenga que actualizar la info de usuario
        
        let updatedPassword =null;
    try{
        if(password){
            updatedPassword = await bcrypt.hash(password,10);
        }
        const updatedUser = await prisma.user.update({
            where:{id},
            data:{...inputs,
                ...(updatedPassword && {password: updatedPassword}),
                ...(avatar && {avatar})
,            }
        })
        const {password:userPassword,...rest} = updatedUser
        res.status(200).json(rest)
    }catch (error){
        console.log(error)
        res.status(500).json({message:"Se fue a pique"})
    }
}
export const deleteUser = async (req,res)=>{

    const id = req.params.id;
        const tokenUserId = req.userId;
        const isAdmin= req.isAdmin
        
        if(id !== tokenUserId && !isAdmin) {
            return res.status(403).json({message: "Not authorized"})
        }
    try{
        await prisma.user.delete( {where:{id}})
        res.status(200).json({message: "User deleted"});
    }catch (error){
        console.log(error)
        res.status(500).json({message:"Se fue a pique"})
    }
}
export const savePost = async (req,res)=>{
    const postId=req.body.postId;
    const tokenUserId=req.userId;


    
    try{
        const savedPost = await prisma.savedPost.findUnique({
            where:{
                userId_postId:{
                    userId: tokenUserId,
                    postId
                }
            }
        });
        if(savedPost){
            await prisma.savedPost.delete({
                where:{
                    id:savedPost.id,
                },
                
            });
            return res.status(200).json({message: "Post unsaved successfully"})
        }

        await prisma.savedPost.create( {data:{
                userId:tokenUserId,
                postId
            }})

        res.status(200).json({message: "Post saved successfully"})
    }catch (error){
        console.log(error)
        res.status(500).json({message:"Se fue a pique"})
    }
}
export const profilePosts = async (req,res)=>{
        let tokenUserId = req.userId;
        
        if(req.params.id) tokenUserId= req.params.id;
        
        
        
    try{
        const userPosts=await prisma.post.findMany( {where:{userId: tokenUserId}})
        const saved=await prisma.savedPost.findMany( {where:{userId: tokenUserId}, include:{post: true}})

        const savedPosts = saved.map((item)=>{ return{...item.post,isSaved:true}})

        res.status(200).json({userPosts, savedPosts});
    }catch (error){
        console.log(error)
        res.status(500).json({message:"Failed to get profile posts"})
    }
}
export const getNotificationNumber = async (req,res)=>{

    const tokenUserId = req.userId;
    try{
        const number = await prisma.chat.count({
            where:{
                userIDs:{
                    hasSome: [tokenUserId]
                },
                NOT:{

                    seenBy:{hasSome:[tokenUserId]}
                }
            }
        })
        res.status(200).json(number)
    }catch(error){
        console.log(error)
        res.status(500).json({message:"Failed to get notification number"})
    }
}
export const updateContactInfo = async (req,res)=>{
    const tokenUserId= req.userId;
    const body=req.body;
    console.log(body)
    
        const contact = await prisma.userContact.findUnique({where:{userId:tokenUserId}})
        console.log(contact)
        try{
        if(!contact){
            const newContact = await prisma.userContact.create({ data: { ...body, userId: tokenUserId } })
            console.log(newContact)

            return res.status(200).json({message: "Contact info created!"})
        }else{
            
            const updateContact = await prisma.userContact.update({
                where:{
                userId:tokenUserId 
            },
            data:{ ...body }
            
            })
            res.status(200).json({message: "Contact info updated!"})

        }
    }catch(error){
        console.log(error)
        res.status(500).json({message:"Failed to create.modify contact information"})

    }
}