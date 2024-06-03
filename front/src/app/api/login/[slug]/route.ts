
import { urlServer } from "@/@variables/env"
import axios, { AxiosError } from "axios"
import { serialize} from 'cookie';
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try{
  const messages= await req.json()
  const res = await axios.post(`${urlServer}/login`,messages)
  const token = res.headers['token']
  const serializedCookie = serialize('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 3600, // 1 hora de vida do cookie
    path: '/', // Caminho do cookie
    //domain: 'example.com', // Domínio do cookie
  });
  return new Response('Success!', {
    status: 200,
     headers: { 'Set-Cookie': serializedCookie }
    })
  
   }catch(err){
    if(err instanceof AxiosError){
      console.log(err.response?.headers)
      const status = err.response?.data['statusCode']
      const message = err.response?.data['message']
      return new Response(message, {
        status:status,
       })
     }
     return new Response('erro', {
      status:400,
     })
    }
  }