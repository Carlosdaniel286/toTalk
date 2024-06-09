import { io } from 'socket.io-client';
import { urlServer } from '@/@variables/env';

export const socketConnect =()=>{
    const connect = io(urlServer, {
        autoConnect: true,
        withCredentials:true
      });
      connect.on('connect', (()=>{
       console.log('usuário conectado')
      }));

      return connect
  }

  const socket= socketConnect()
  export {socket}