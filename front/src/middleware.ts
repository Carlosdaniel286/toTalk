import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { urlServer } from './@variables/env';
import { NextFetchEvent, NextRequest } from 'next/server';

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  const headersList = cookies();
  const token = headersList.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
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

    // Continua o fluxo da requisição atual
    return NextResponse.next();
  } catch (err) {
    console.error('Erro ao validar token:', err);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// Configuração para o caminho que o middleware deve corresponder
export const config = {
  matcher: '/toTalk/feed/:path*',
};
