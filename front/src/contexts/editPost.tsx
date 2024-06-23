'use client'

import { ReactNode, createContext, useContext, useState } from "react";

type proposSiderbarProvider={
    children:ReactNode
}
interface editPostContext {
    displayEditPost:boolean
    toggleEditPost: (value:boolean) => void
}


const  EditPostContext = createContext< editPostContext |undefined>(undefined)

export const EditPostProvider =({children}:proposSiderbarProvider)=>{
    const[ displayEditPost , setDisplayEditPost]=useState(false)

    const toggleEditPost = (value:boolean) => {
        setDisplayEditPost(value)
      };
    
    
    return(
    <EditPostContext.Provider value={{displayEditPost,toggleEditPost}}>
    <>
     {children}
    </>
   </EditPostContext.Provider>
 )
}

export const useEditPostContext = () => {
    const context = useContext(EditPostContext);
    if (!context) {
        throw new Error("useSidebar deve ser usado dentro de um SidebarProvider");
    }
    return context;
};