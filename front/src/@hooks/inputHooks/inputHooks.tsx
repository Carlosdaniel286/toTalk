import { useState } from 'react';
import { initInputValue } from '@/constants';
import { validations } from '@/functions/validations/validation';
import validator from 'validator';
export type inputType = 'email' | 'phone' | 'name'| 'password' | 'lastName' 

export function useCustomInput() {
  const [inputValue, setInputValue] = useState(initInputValue);
  
  const checkInputs =()=>{
    let check = true
    const arr = Object.entries(inputValue);
    arr.map((value)=>{
      const inputType:inputType = value[0] as inputType
      const values = value[1] as string
      if(validator.isEmpty(values)) check =false
      const erros = validations({value:values,inputType})
      if(erros.error) check =false
       
    })
    return check
  }
  return { inputValue, setInputValue,checkInputs};
}
