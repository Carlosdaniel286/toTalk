import { comment } from "../../comments/[slug]/route";

export async function GET( request: Request,
    { params }: { params: { slug: string } }) {
    const id = params.slug
    
    const filter = comment.filter((item)=>{
     if(item.idPosts.toString()==id) return item
      return []
    })
    
    
    
    return Response.json(filter)
  

}