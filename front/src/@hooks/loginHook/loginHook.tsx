import { errorValidation } from "@/@types/validations/validations";
import { useCustomInput } from "../inputHooks/inputHooks";


export const useCustomLogin = () => {
    const { setInputValue, inputValue, handleInputsEmpty, setErros, erros } = useCustomInput();
  
    const onSubmit = () => {
      const isEmptyEmail = handleInputsEmpty(inputValue, ['email']);
      const errosValid: errorValidation = {
        error: true,
        message: 'Existem campos vazios'
      };
  
      if (isEmptyEmail) {
        setErros("email", errosValid);
      }
  
      const isEmptyPassword = handleInputsEmpty(inputValue, ['password']);
      if (isEmptyPassword) {
        setErros('password', errosValid);
      }
    };
    return{onSubmit,setInputValue, inputValue, setErros, erros}

}