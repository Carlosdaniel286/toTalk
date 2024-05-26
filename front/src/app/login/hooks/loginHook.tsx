import { errorValidation } from "@/@types/validations";
import { useCustomInput } from "../../../@hooks/inputHooks";
import { validations,isEmpty } from "@/functions/validations/validation";
import { apiLogin } from "../api/login";

export const useCustomLogin = () => {
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
  await apiLogin(email??'',password??'')
    

  };
  return { onSubmit, setInputValue, inputValue, setErros, erros }

}