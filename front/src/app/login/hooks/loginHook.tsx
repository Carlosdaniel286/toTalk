
import { useCustomInput } from "../../../@hooks/inputHooks";
import { isEmpty } from "@/functions/validations/validation";
import { apiLogin } from "../api/login";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
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
  const idTemporary = uuidv4();
  if(login.status==400){
    return Swal.fire({
       title: 'ops',
       text: login.message,
       icon: 'warning',
      
     });
     
   }
  if(login.status==200){
    Swal.fire({
     title: 'sucesso',
     text: login.message,
     icon:'success',
    showConfirmButton:false,
    timer:1000
   });
   
  }
  if(login.status==200) router.push(`/toTalk/feed/${idTemporary}`)
    
  
  }
  
  
  return { onSubmit, setInputValue, inputValue, setErros, erros, }

}