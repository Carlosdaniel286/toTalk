import { useState } from 'react';
import { initInputValue} from '@/constants';
import { propsInputValue ,propsSpreedInputValue } from '@/@types/inputs/inputs';
import { validations } from '@/functions/validations/validation';
import validator from 'validator';
export type inputType = 'email' | 'phone' | 'name'| 'password' | 'lastName' 




export function useCustomInput() {
  const [inputValue, setInputValue] = useState<propsInputValue>(initInputValue);
  
  const checkInputs =()=>{
    let check = true
    const inputValueToArry = Object.entries(inputValue);
    inputValueToArry.forEach((value)=>{
      const inputType:inputType = value[0] as inputType
      const values = value[1] as string
      
      if(validator.isEmpty(values)) check =false
      const erros = validations({value:values,inputType})
      if(erros.error) check =false
       
    })
    return check
  }
  const checkAnyInputs =({name,email,lastName,phone,password}:propsSpreedInputValue)=>{
    const arry = [name,email,lastName,phone,password]

    //const erros = validations({value:arry[0],inputType:'name'})
  }
  
  
  return { inputValue, setInputValue,checkInputs};
}
