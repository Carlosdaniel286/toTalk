import { type NextRequest } from 'next/server'
import { arry } from "../../router/[slug]/route";
type posts ={
  user:string
  content:string,
  idPosts:number,
  id:number
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
     id:comment.length+1
   }
  }
}





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
        const comments =new Comments(body)
        const save = comments.save()
        comment.unshift(save)
        return Response.json(save)
      
      }catch(err){
         console.log(err)
         return Response.json(err)
       
       }
     
  }