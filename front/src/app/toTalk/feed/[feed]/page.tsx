import axios from "axios";
import { cookies } from 'next/headers';
import { urlServer } from "@/@variables/env";
import { Feed } from "./feed";
import { posts as PostsType } from "@/@types/post";
import { redirect } from "next/navigation";

async function getProjects(): Promise<PostsType[] | null> {
    const headersList = cookies();
    const token = headersList.get('token')?.value;

    if (!token) return null

    try {
        
        const response = await axios.get(`${urlServer}/feed`, {
            headers: {
                Cookie: `token=${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        return response.data;
    } catch (err) {
        console.error("Erro ao obter projetos:", err);
        return null;
    }
}

export default async function SignIn() {
    const projects = await getProjects();
    
    if (projects) {
        return (
         <Feed posts={projects} />
       );
    } else {
        return redirect('/login');
    }
}
