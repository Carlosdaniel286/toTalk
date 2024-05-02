import { type NextRequest } from 'next/server'
import { arry } from "../../router/[slug]/route";
type posts ={
  user:string
  id:number,
  content:string,
  idPosts:number,

}

const comments:posts[]=[]

export async function GET( request: Request,
    { params }: { params: { slug: string } }) {
    const id = params.slug
    
    const filter = arry.filter((item)=>{
      return item.id.toString()==id
    })
    
    
    
    return Response.json(filter)
  

}
  export async function POST(req:Request) {
      try{
        const body:posts  = await req.json()
        comments.push(body)
        return Response.json(comments)
      
      }catch(err){
         console.log(err)
         return Response.json(err)
       
       }
     
  }