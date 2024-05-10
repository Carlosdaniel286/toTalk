import { comments } from "../../comments/[slug]/route";

export async function GET( request: Request,
    { params }: { params: { slug: string } }) {
    const id = params.slug
    
    const filter = comments.filter((item)=>{
     if(item.idPosts.toString()==id) return item
      return [{
        user:'',
        content:'',
       idPosts:item.idPosts,
      }]
    })
    
    
    
    return Response.json(filter)
  

}