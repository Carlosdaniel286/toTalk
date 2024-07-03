'use client'

import { ReactNode, createContext, useContext, useState } from "react";
import { number } from "zod";

// Define a interface para as propriedades do CommentCountProvider
type CommentCountProviderProps = {
    children: ReactNode;
}

// Define a interface para o contexto de contagem de comentários
interface CommentCountContext {
    commentCount: number;
    updateCommentCount: (value: number|'add') => void;
}

// Cria o contexto para a contagem de comentários
const CommentCountContext = createContext<CommentCountContext | undefined>(undefined);

// Provider para o contexto de contagem de comentários
export const CommentCountProvider = ({ children }: CommentCountProviderProps) => {
    const [commentCount, setCommentCount] = useState<number>(0);

    // Função para atualizar a contagem de comentários
    const updateCommentCount = (value: number|'add') => {
        if(typeof value =="number") return setCommentCount(value);
        setCommentCount(prevCount => prevCount + 1);
        
       
    };

    return (
        <CommentCountContext.Provider value={{ commentCount, updateCommentCount }}>
            {children}
        </CommentCountContext.Provider>
    );
}

// Hook customizado para usar o contexto de contagem de comentários
export const useCommentCount = () => {
    const context = useContext(CommentCountContext);
    if (!context) {
        throw new Error("useCommentCount deve ser usado dentro de um CommentCountProvider");
    }
    return context;
};
