import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { urlServer } from './@variables/env';
import { NextFetchEvent, NextRequest } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
export async function middleware(request: NextRequest, event: NextFetchEvent) {
  const headersList = cookies();
  const token = headersList.get('token')?.value;

 
  const idTemporary = uuidv4();
  const isResgisterUser = request.nextUrl.pathname.startsWith('/registerUser')
  const isLogin = request.nextUrl.pathname.startsWith('/login')
  try {
    if (!token) {
      console.log('sem token')
    throw new Error('sem token')
   
     }
    // Faz uma requisição para validar o token
   
    event.waitUntil(
      fetch(`${urlServer}/token`, {
        headers: {
          Cookie: `token=${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
    );
   
    if(isResgisterUser || isLogin){
      return NextResponse.redirect(new URL(`/toTalk/feed/${idTemporary}`, request.url));
    }
    // Continua o fluxo da requisição atual
    return NextResponse.next();
  } catch (err) {
    console.log(request.nextUrl.pathname)
     
    if (isResgisterUser || isLogin) {
      console.log(isLogin)
      return NextResponse.next();
    }
     console.log(err)
    return NextResponse.redirect(new URL('/login', request.url));
  
  }
}

// Configuração para o caminho que o middleware deve corresponder
export const config = {
 matcher: ['/toTalk/feed/:path*','/login','/registerUser'],
};
