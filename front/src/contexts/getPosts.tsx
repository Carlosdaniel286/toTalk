'use client'

import { ReactNode, createContext, useContext, useState } from "react";
import { initPosts } from "@/constants";
export type posts ={
    user?:string
    id?:number,
    content:string,
  
  }
type proposGetPost={
    children:ReactNode
}

interface getPostContext {
    getPost: posts | undefined
    handlePosts: (value:posts) => void
}

const GetPostContext = createContext<getPostContext |undefined>(undefined)
export const GetPostProvider =({children}:proposGetPost)=>{
    
    const[ getPost , setPost]=useState<posts>({
        content:''
    })
  
    const handlePosts = (value:posts) => {
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