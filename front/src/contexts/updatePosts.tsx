'use client'

import { ReactNode, createContext, useContext, useState } from "react";
import { posts } from "@/@types/post";
type proposGetPost={
    children:ReactNode
}

interface getPostContext {
    newPost: posts | undefined
    UpdatePosts: (value:posts) => void
}

const UpdatePostContext = createContext<getPostContext |undefined>(undefined)
export const GetPostProvider =({children}:proposGetPost)=>{
    
    const[ newPost , setPost]=useState<posts>()
  
    const UpdatePosts = (value:posts) => {
        setPost({...newPost,...value})
      };
    
    
    return(
    <UpdatePostContext.Provider value={{newPost,UpdatePosts}}>
       {children}
   </UpdatePostContext.Provider>
 )
}

export const useUpdatePost = () => {
    const context = useContext(UpdatePostContext);
    if (!context) {
        throw new Error("useGetPost deve ser usado dentro de um SidebarProvider");
    }
    return context;
};