import {  useState } from 'react';
import {  initInputValue,initInputValidation} from '@/constants'
import { propsInputValue  } from '@/@types/inputs/inputs';
import { validations } from '@/functions/validations/validation';
import validator from 'validator';
import { errorValidation } from '@/@types/validations/validations';
export type inputType = 'email' | 'phone' | 'name'| 'password' | 'lastName' 




export function useCustomInput() {
  const [inputValue, setInputValue] = useState<propsInputValue>(initInputValue);
  const[erros,setErro]=useState(initInputValidation)
  
  const setErros = (type: inputType, error: errorValidation) => {
    setErro(prevErros => ({
      ...prevErros,
      [type]: {...error}
    }));
  }
 
  
  
  const handleInputsEmpty =(inputValue:propsInputValue,value?:inputType[])=>{
    let check = true
    const types:inputType[] =['name','email','password','phone']
    const values = value ?  value : types

     values.forEach((item)=>{
     if( item  &&  validator.isEmpty(inputValue[item] )){
      const validation = validations('%%',item)
      setErros(item,validation)
      check = false
    }
    
  })
   return check
  }
  
   
  
  
  
  return { inputValue,setInputValue, initInputValue,setErros,erros,handleInputsEmpty};
}
