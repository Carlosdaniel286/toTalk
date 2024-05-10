import { type NextRequest } from 'next/server'
import { arry } from "../../router/[slug]/route";
type posts ={
  user:string
  content:string,
  idPosts:number,
  id:number
}

export const comments:posts[]=[ {
  id:1,
  content:'',
  user:'',
  idPosts:1
}]

export async function GET( request: Request,
    { params }: { params: { slug: string } }) {
    const id = params.slug
    const filter = arry.filter((item)=>{
       if(item.id.toString()==id) return item
      return arry
    })
    const posts = filter[0]
    console.log(posts)
    
    return Response.json(posts)
  

}
  export async function POST(req:Request) {
    
      try{
        const body:posts  = await req.json()
        console.log(body)
        comments.push(body)
        return Response.json(comments)
      
      }catch(err){
         console.log(err)
         return Response.json(err)
       
       }
     
  }