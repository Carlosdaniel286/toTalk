import axios from "axios"
import {cookies } from 'next/headers'
import { urlServer } from "@/@variables/env"
import { Feed } from "./feed"
import { posts } from "@/@types/post"
import { redirect } from "next/navigation"


async function getProjects() {
    try{
        const headersList = cookies()
        const token = headersList.get('token')?.value
        
        if(!token) return
    
        const response = await axios.get(`${urlServer}/feed`,{
            headers: {
                Cookie: `token=${token}`
              }
        })
        const posts:posts[] = response.data
        console.log(response)
       return posts
    
    
    }catch(err){
        console.log(err)
        throw err
    }
  }
   
  export default async function SingIn() {
   try{
    //const{UpdatePosts}=useUpdatePost()
    const projects = await getProjects()
    //console.log(projects)
   if(projects){
        return(
        <Feed
          posts={projects}
        /> 
        )}else{
         return redirect('/login')
        }
  } catch(err){
    return redirect('/login')
}
  }