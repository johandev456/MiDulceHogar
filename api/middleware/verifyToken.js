import jwt from "jsonwebtoken"

//Basicamente el middleware permite interceptar cualquier proceso
//Aqui se estaria verificando y luego continuando el proceso original
export const verifyToken = (req, res, next) => {
    const token = req.cookies.token
    
        if(!token) return res.status(401).json({message: "Not authenticated"});
    
        jwt.verify(token, process.env.JWT_SECRET_KEY, async(err, payload)=>{
            if(err) return res.status(403).json({message: "Token is not valid!"});
            req.userId = payload.id; // Se obtiene el id del usuario para verificaciones posteriores

            next();
        })
    
        

        
}