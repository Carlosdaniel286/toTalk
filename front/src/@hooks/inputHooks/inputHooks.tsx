import {  useState } from 'react';
import {  initInputValue,initInputValidation} from '@/constants';
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
  
  
  const handle =(value?:inputType[] )=>{
    let check = true
    const types:inputType[] =['name','email','password','phone']
    const values = value? value : types
    
    values.forEach((item)=>{
    if( item =='name' &&  validator.isEmpty(inputValue.name )){
      const validation = validations('%%','name')
      setErros('name',validation)
      check = false
    }
    if( item =='email' && validator.isEmpty(inputValue.email )){
      const validation = validations('%%','email')
      setErros('email',validation)
      check = false
    } 
    if( item =='password' && validator.isEmpty(inputValue.password )){
      const validation = validations('%%','password')
      setErros('password',validation)
      check = false
    } 
    if( item =='phone' && validator.isEmpty(inputValue.phone )){
      const validation = validations('%%','phone')
      setErros('phone',validation)
      check = false
    } 
  })
   return check
  }
  
   
  
  
  
  return { inputValue,setInputValue, initInputValue,setErros,erros,handle};
}
