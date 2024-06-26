import { CreateUser } from "./createUser";
import { urlServer } from "@/@variables/env";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';

async function getProjects() {
  try {
    const cookie = cookies()
    const token = cookie.get('token')?.value
     await axios.get(`${urlServer}/token`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'cookie':`token=${token}`
      }
    });
    return 200;
  } catch (error) {
    console.error("Erro ao obter projetos:", error);
    return 400;
  }
}

export default async function RegisterUser() {
  const status = await getProjects();
  const idTemporary = uuidv4();
  if (status === 200) {
    return redirect(`/toTalk/feed/${idTemporary}`);
  }
return (
    <CreateUser />
  );
}
