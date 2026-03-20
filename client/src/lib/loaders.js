import { defer } from "react-router-dom";
import apiRequest from "./apiRequest"

export const singlePageLoader = async ({request,params})=>{
    const res = await apiRequest("/posts/"+params.id)
    const res1= await apiRequest("/users/"+res.data.userId)
    const postAndUser ={res,res1}
    
    return postAndUser;
}
export const listPageLoader = async ({request,params})=>{
    const query = request.url.split("?")[1]
    const postPromise = apiRequest("/posts?"+query)
    return defer({
        postResponse: postPromise
    });
   
}
export const getUserContact = async ({request,params})=>{
    const res = await apiRequest("/users/"+params.id)
    return res.data.userContact;
}

export const profilePageLoader = async ()=>{
    
    const postPromise = apiRequest("/users/profilePosts");
    const chatPromise = apiRequest("/chats");
    return defer({
        postResponse: postPromise,
        chatResponse: chatPromise
    })
}

export const listUserLoader = async ()=>{
    
    const usersPromise = apiRequest("/users/")
    return defer({
        usersResponse: usersPromise
    });
   
}