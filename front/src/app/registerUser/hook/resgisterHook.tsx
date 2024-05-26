import { useState } from "react";
import { useCustomInput } from "../../../@hooks/inputHooks";
import { isEmpty} from "@/functions/validations/validation";
import { apiCreateUser } from "../api/resgister.user";


export const useCustomRegister = (style: { readonly [key: string]: string; }) => {
  const { setInputValue, inputValue, setErros, erros } = useCustomInput();
  const [inputsConfirmed, setInputsConfirmed] = useState(true);
  const [styles, setStyles] = useState(style.container);
  const [texts, setTexts] = useState({
    text: 'Crie sua conta',
    button: 'próximo'
  });

  const onSubmit = () => {
    const inputsIsEmpty = isEmpty(inputValue.name??'')
    if(inputsIsEmpty.error){
      setErros('name',{...inputsIsEmpty})
      return
    }
   if (inputsConfirmed) {
      setStyles(style.transition);
     setTimeout(() => {
        setStyles(style.container);
        setInputsConfirmed(false);
        setTexts({
          ...texts,
          text: 'Termine sua conta',
          button: 'criar conta'
        });
      }, 1000);
    }
     return;
    }

    const onCreateAccount = async () => {
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
    const{name,password,email}=inputValue
     await apiCreateUser(name??'',password??'',email??'')
    
      
    };
  return {
    onSubmit,
    onCreateAccount,
    inputValue,
    setInputValue,
    erros,
    setErros,
    styles,
    texts,
    inputsConfirmed,
 };
};
