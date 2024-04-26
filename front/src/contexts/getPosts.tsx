'use client'

import { ReactNode, createContext, useContext, useState } from "react";
import { propsPost } from "@/@types/post";
import { initPosts } from "@/constants";
type proposGetPost={
    children:ReactNode
}

interface getPostContext {
    getPost: propsPost | undefined
    handlePosts: (value:propsPost) => void
}

const GetPostContext = createContext<getPostContext |undefined>(undefined)
export const GetPostProvider =({children}:proposGetPost)=>{
    
    const[ getPost , setPost]=useState<propsPost>(initPosts)
  
    const handlePosts = (value:propsPost) => {
        setPost({...getPost,...value})
      };
    
    
    return(
    <GetPostContext.Provider value={{getPost,handlePosts}}>
       {children}
   </GetPostContext.Provider>
 )
}

export const useGetPost = () => {
    const context = useContext(GetPostContext);
    if (!context) {
        throw new Error("useGetPost deve ser usado dentro de um SidebarProvider");
    }
    return context;
};