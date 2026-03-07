import bcrypt from "bcrypt";
import "dotenv/config";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const { username, email, password } = req.body;
    // hash the password

    try{const hashedPassword = await bcrypt.hash(password, 10); // Replace with actual hashing logic
    console.log("Hashed Password:", hashedPassword);

    const newUser = await prisma.user.create({
        data:{
            username,
            email,
            password: hashedPassword
        }
    });
    console.log(newUser);

    res.status(201).json({ message: "User created successfully"})
    } catch (error) {
        console.log("Error creating user:", error);
        res.status(500).json({ message: "Failed to create user!" });
    }
}
export const login = async (req, res) => {
    const { email, password, username } = req.body;

    try{// Verificar si el usuario existe en la base de datos
    const user = await prisma.user.findUnique({
        where:{username}
    })
    if(!user) return res.status(401).json({ message: "Credenciales inválidas" });
    // Verificar la contraseña 
    const passwordValidacion = await bcrypt.compare(password, user.password);
    if(!passwordValidacion) return res.status(401).json({ message: "Credenciales inválidas" });
        const age = 1000 * 60 * 60 * 24 * 7; // 7 días en milisegundos

    // Generar un token de autenticación
    const token = jwt.sign({
        id: user.id,
    }, process.env.JWT_SECRET_KEY,{expiresIn: age}) // Clave secreta para firmar el token)


    const {password: userPassword, ...userData} = user

    res.cookie("token", token,{
        httpOnly: true,
        //secure:true
        maxAge: age
    }).status(200).json({userData})
    } catch (error) {
        console.log("Error during login:", error);
        res.status(500).json({ message: "Login failed!" });
    }
}


export const logout = (req, res) => {
    
    res.clearCookie("token").status(200).json({ message: "Logout successful!" });
    

}