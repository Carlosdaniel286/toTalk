
type posts ={
  user:string
  id:string,
  content:string,
  date:Date
}
export const arry:posts[] =[ 
  {
  id:"0",
  content:'bem vindo ao toTalk',
  user:'',
  date:new Date()
}]

class creatPost {
  private content:string
  constructor(content:string){
    this.content=content
  }

  save(){
    const obj ={
      id:(arry.length+1).toString(),
      content:this.content,
      user:'carlos',
      date:new Date()
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

  