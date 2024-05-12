
type posts ={
  user:string
  id:number,
  content:string,

}
export const arry:posts[] =[ 
  {
  id:0.1,
  content:'bem vindo ao toTalk',
  user:''
}]

class creatPost {
  private content:string
  constructor(content:string){
    this.content=content
  }

  save(){
    const obj ={
      id:arry.length+1,
      content:this.content,
      user:'carlos'
    }
    arry.unshift(obj)
    return obj
  }
}

export async function GET(req:Request) {
  return Response.json(arry)
}

  export async function POST(req:Request) {
    try{
      const body:posts = await req.json()
      console.log(body)
      const posts = new creatPost(body.content)
      const post = posts.save()
      return Response.json(post)
    }catch(err){
       console.log(err)
       return Response.json(err)
     }
   
}

  