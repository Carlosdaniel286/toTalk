import { urlClient } from '../@environment.variable';
import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

export const corsOptions: CorsOptions = {
    origin:urlClient,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Permite esses métodos
    allowedHeaders: 'Content-Type, Accept', // Permite esses cabeçalhos
    credentials: true, 
  };