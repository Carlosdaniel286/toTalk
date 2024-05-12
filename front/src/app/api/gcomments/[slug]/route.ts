import { comment } from "../../comments/[slug]/route";

export async function GET( request: Request,
    { params }: { params: { slug: string } }) {
    const id = params.slug
    
    const filter = comment.filter((item)=>{
     return item.idPosts.toString()==id
      
    })
    
    const posts = filter?filter:[]
    return Response.json(posts)
  

}