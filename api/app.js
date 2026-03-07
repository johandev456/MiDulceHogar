import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.route.js";

const app = express();


app.use(cors({origin: process.env.CLIENT_URL, credentials: true}));
app.use(express.json());
app.use(cookieParser());
console.log('DB URL defined:', process.env.DATABASE_URL);
// Use the post route
app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);

console.log("test");

app.listen(4000, ()=>{
    console.log("Server is running"); 
});
 