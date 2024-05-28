
import { useCustomInput } from "../../../@hooks/inputHooks";
import { isEmpty } from "@/functions/validations/validation";
import { apiLogin } from "../api/login";
import { useRouter } from "next/navigation";
import { apiCheckToken } from "../api/checkToken";
import { useEffect } from "react";


export const useCustomLogin = () => {
  const router = useRouter()
  const { setInputValue, inputValue, setErros, erros } = useCustomInput();

  const onSubmit = async () => {
    const isEmptyPassword = isEmpty(inputValue.password ?? '');
    const isEmptyEmail = isEmpty(inputValue.email ?? '');
     const newErrors = { ...erros }; // Copia o estado de erros existente
    if (isEmptyEmail.error || isEmptyPassword.error) {
      newErrors.email = isEmptyEmail;
      setErros("email" ,newErrors.email);
      newErrors.password = isEmptyPassword;
      setErros("password" ,newErrors.password);
      return
    }
  const{email,password}=inputValue
  const login = await apiLogin(email??'',password??'')
  if(login.status==200) router.push('/toTalk/feed/carlos')

  };
  const checkToken = async()=>{
    const token = await apiCheckToken()
    if(token) router.push('/toTalk/feed/carlos')
  }
  useEffect(()=>{
   checkToken()
   },[])
  
  
  return { onSubmit, setInputValue, inputValue, setErros, erros, }

}