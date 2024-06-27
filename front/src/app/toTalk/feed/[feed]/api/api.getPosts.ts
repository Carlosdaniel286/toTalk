import axios from "axios";
import { urlServer } from "@/@variables/env";
import { posts as PostsType } from "@/@types/post";

export async function getPosts(): Promise<PostsType[] | null> {
     try {
        const response = await axios.get(`${urlServer}/feed`, {
           withCredentials:true
        });
        console.log('Dados obtidos:', response.data);
        return response.data;
    } catch (err) {
        console.error("Erro ao obter projetos:", err);
        return null;
    }
}
