import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken"
export const getPosts = async (req, res) =>{
    const query = req.query;
    
    switch(query.property){
        case "apartment":
            query.property="apartamento"
            break;
        case "house":
            query.property="casa"
            break;
        case "land":
            query.property="terreno"
            break;
        
            
       
    }
    
    const page = parseInt(query.page) || 1;
    const limit = 10;

    const where = {
        city: query.city ? {
            equals: query.city,
            mode: "insensitive",
        } : undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: parseInt(query.bedroom) || undefined,
        price: {
            gte: parseInt(query.minPrice) || 0,
            lte: parseInt(query.maxPrice) || 100000000
        }
    };

    try{
        const [posts, total] = await Promise.all([
            prisma.post.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
            }),
            prisma.post.count({ where })
        ]);

        const token = req.cookies?.token;

        if (token) {
            jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
                if (!err) {
                    const postsWithSaved = await Promise.all(
                        posts.map(async (ps) => {
                            const saved = await prisma.savedPost.findUnique({
                                where: {
                                    userId_postId: {
                                        postId: ps.id,
                                        userId: payload.id,
                                    },
                                },
                            });
                            return { ...ps, isSaved: !!saved };
                        })
                    );
                    return res.status(200).json({ posts: postsWithSaved, total });
                }
            });
        } else {
            return res.status(200).json({ posts, total });
        }
    
        
    }catch(error){
        console.log(error)
        res.status(500).json({message:"Failed to get posts!"})
    }
}

export const getPost = async (req, res) =>{
    try{
        const id = req.params.id;
        const post = await prisma.post.findUnique({where: {id}, 
        include:{
            postDetail:true,
            user:{
                select:{
                    username: true,
                    avatar: true
                }
            }
        }
        });
        
    const token = req.cookies?.token;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (!err) {
          const saved = await prisma.savedPost.findUnique({
            where: {
              userId_postId: {
                postId: id,
                userId: payload.id,
              },
            },
          });
         return res.status(200).json({ ...post, isSaved: !!saved }); //el signo !! convierte a booleano por eso funciona ya sea false o true.
        }
      });
    }else
    {return res.status(200).json({ ...post, isSaved: false });}
    
    }catch(error){
        console.log(error)
        res.status(500).json({message:"Failed to get post!"})
    }
}
export const updatePost = async (req, res) =>{
    try{
        console.log(req)
        const id= req.params.id;
        const tokenUserId = req.userId;
        const access =req.isAdmin;
        
        const data = req.body;
        const post = await prisma.post.findUnique({where:{id}})
        if((post.userId!==tokenUserId) && access===false) return res.status(403).json({message: "Not authorized!"})
        const updatePost= await prisma.post.update({where:{id}, data:{...data.postData}}) 
        const updatePostDetail= await prisma.postDetail.update({where:{postId:post.id}, data:{...data.postDetail}})        
        res.status(200).json({message: "Post updated successfully!"})
    }catch(error){
        console.log(error)
        res.status(500).json({message:"Failed to update posts!"})
    }
}
export const deletePost = async (req, res) =>{
    const id = req.params.id;
    const tokenUserId = req.userId;
    const access =req.isAdmin;
    try{
        
        const post = await prisma.post.findUnique({where:{id}})
        if(!post) return res.status(404).json({message: "Post was not found"})
        if((post.userId!==tokenUserId) && access===false) return res.status(403).json({message: "Not authorized!"})
        
        // Borrar SavedPost asociados
        await prisma.savedPost.deleteMany({
            where: {postId: id}
        })
        
        // Borrar PostDetail asociado
        await prisma.postDetail.deleteMany({
            where: {postId: id}
        })
        
        // Borrar el Post
        await prisma.post.delete({
            where:{id}
        })
        
        res.status(200).json({message: "Post deleted successfully!"})
    }catch(error){
        console.log(error)
        res.status(500).json({message:"Failed to delete post!"})
    }
}
export const addPost = async (req, res) =>{
    const tokenUserId = req.userId;
    
    const body = req.body;
    console.log(body)
    try{
        const newPost= await prisma.post.create({data:{...body.postData ,userId:body.dataUser.userId, postDetail:{
            create:body.postDetail
        }}})
        
        res.status(200).json(newPost)
    }catch(error){
        console.log(error)
        res.status(500).json({message:"Failed to create posts!"})
    }
}