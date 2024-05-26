import * as dotenv from 'dotenv';
dotenv.config();
const securityToken = process.env.SECRUTY_TOKEN;
const urlClient = process.env.URL_CLIENT as string
 const jwtConstants = {
    secret:securityToken,
  };

  export{jwtConstants,urlClient}
  