import { createServer } from "http"
import {Server} from "socket.io"

const httpServer = createServer();

const io = new Server(httpServer, {
    cors:{
        origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
        methods: ["GET", "POST"]
    },
});

let onlineUser =[]

const addUser = (userId,socketId)=>{
    const userExits = onlineUser.find((user)=>user.userId ===userId);
    console.log("existe? "+userExits)
    if(!userExits){
        onlineUser.push({userId, socketId})
        
    }
    console.log(onlineUser)
}

const removeUser=(socketId)=>{
    onlineUser = onlineUser.filter(user=>user.socketId!==socketId);
};
const getUser =(userId)=>{
    return onlineUser.find((user)=>user.userId === userId)
}

io.on("connection",(socket)=>{
    console.log("Socket connected:", socket.id)
    socket.on("newUser", (userId)=>{
        addUser(userId,socket.id)
       
    });

    socket.on("sendMessage",({receiverId,data})=>{
        const receiver = getUser(receiverId)
       
        io.to(receiver.socketId).emit("getMessage",data)
    })
    socket.on("disconnect",()=>{
        removeUser(socket.id)
    })
})

io.listen("4001")