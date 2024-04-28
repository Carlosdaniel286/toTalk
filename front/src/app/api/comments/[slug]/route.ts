import { type NextRequest } from 'next/server'
import { arry } from "../../router/[slug]/route";


export async function GET( request: Request,
    { params }: { params: { slug: string } }) {
    const id = params.slug
    
    const filter = arry.filter((item)=>{
      return item.id.toString()==id
    })
    
    
    console.log(id)
    return Response.json(filter)
  

}
  
    export async function POST(req:Request) {
      try{
       
      }catch(err){
         console.log(err)
         return Response.json(err)
       }
     
  }