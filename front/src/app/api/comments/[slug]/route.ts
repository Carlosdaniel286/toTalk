import { type NextRequest } from 'next/server'
import { arry } from "../../router/[slug]/route";
type posts ={
  user:string
  content:string,
  idPosts:number,
  id:string,
  date:Date
}

export const comment:posts[]=[]

class Comments {
 private user:string
 private content:string
 private idPosts:number
 private id=1
  constructor( {user,content,idPosts}:posts){
   this.user= user
   this.content =content
   this.idPosts=idPosts
   
  }

  save(){
   return{
     user:this.user,
     content:this.content,
     idPosts:this.idPosts,
     id:(comment.length+1).toString(),
     date:new Date()
   }
  }
}





export async function GET( request: Request,
    { params }: { params: { slug: string } }) {
    const id = params.slug
     console.log(id)
    const filter = arry.find((item)=>{
      const itemID= item.id.toString()
      console.log(itemID)
      console.log(itemID==id)
       return itemID==id
       
    })
    const posts = filter?filter:[]
 return Response.json(posts)
  

}
  export async function POST(req:Request) {
    
      try{
        const body:posts  = await req.json()
        const comments =new Comments(body)
        const save = comments.save()
        comment.unshift(save)
        return Response.json(save)
      
      }catch(err){
         console.log(err)
         return Response.json(err)
       
       }
     
  }