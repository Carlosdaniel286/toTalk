import * as dotenv from 'dotenv';
dotenv.config();
const securityToken = process.env.SECRUTY_TOKEN;

 const jwtConstants = {
    secret:securityToken,
  };

  export{jwtConstants}
  