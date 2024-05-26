import { useState } from 'react';
import { initInputValue, initInputValidation} from '@/constants'
import { propsInputValue } from '@/@types/inputs';
import { validations,schema } from '@/functions/validations/validation';
import validator from 'validator';
import { errorValidation } from '@/@types/validations';
export type inputType = 'email' | 'phone' | 'name' | 'password' 




export function useCustomInput() {
  const [inputValue, setInputValue] = useState<propsInputValue>(initInputValue);
  const [erros, setErro] = useState(initInputValidation)

  const setErros = (type: inputType, error: errorValidation) => {
    setErro(prevErros => ({
      ...prevErros,
      [type]: { ...error }
    }));
  }

  




  return { inputValue, setInputValue, initInputValue, setErros, erros};
}
