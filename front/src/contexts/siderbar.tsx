'use client'

import { ReactNode, createContext, useContext, useState } from "react";

type proposSiderbarProvider={
    children:ReactNode
}
interface sidebarContext {
    displayCreatePost:boolean
    toggleDisplayCreatePost: (value:boolean) => void
}


 

const SidebarContext = createContext<sidebarContext |undefined>(undefined)

export const SiderProvider =({children}:proposSiderbarProvider)=>{
    const[displayCreatePost , setDisplayCreatePost]=useState(false)

    const toggleDisplayCreatePost = (value:boolean) => {
        setDisplayCreatePost(value)
      };
    
    
    return(
    <SidebarContext.Provider value={{displayCreatePost,toggleDisplayCreatePost}}>
    <>
     {children}
    </>
   </SidebarContext.Provider>
 )
}

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar deve ser usado dentro de um SidebarProvider");
    }
    return context;
};