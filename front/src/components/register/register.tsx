'use client'
import style from './styles/register.module.css';
import { InputStandard } from '../standard_Input/inputs';
import { Button } from '@mui/joy';
import { useCustomInput } from '@/@hooks/inputHooks/inputHooks';
import {useState } from 'react';
import { validations } from '@/functions/validations/validation';
import { FormControl } from '../form/form';
import { errorValidation } from '@/@types/validations/validations';


export function RegisterFrom() {
  const { setInputValue, inputValue, handleInputsEmpty,setErros,erros } = useCustomInput();
  const [inputsConfirmed, setInputsConfirmed] = useState(false);
  const[styles,setStyles]=useState(style.container)
  
  const onSubmit=()=>{
    const inputsIsEmpty = handleInputsEmpty(inputValue,['name']);
     if(inputsIsEmpty && !inputsConfirmed) {
      setStyles(style.transition)
        setTimeout(() => {
        setStyles(style.container)
        setInputsConfirmed(inputsIsEmpty)
        }, 1000);
        return
      }
       const isEmptyEmail = handleInputsEmpty(inputValue, ['email']);
        const errosValid: errorValidation = {
          error: true,
          message: 'Existem campos vazios'
        };
    
        if (!isEmptyEmail) {
          setErros('email', errosValid);
        }
    
        const isEmptyPassword = handleInputsEmpty(inputValue, ['password']);
        if (!isEmptyPassword) {
          setErros('password', errosValid);
        }
      
       
    
  }
  
return (
    <div className={styles}>
      <FormControl
       type='resgister'
       onSubmit={(()=>{
       onSubmit()
       })}
       content={
        <>
         {!inputsConfirmed ? (
          < div>
           <InputStandard
            label=''
            onChange={(ev) => {
              setInputValue({ ...inputValue, name: ev });
              const validation = validations(ev, 'name');
              setErros('name', validation);
            }}
            value={inputValue.name}
            placeholder='Digite um nome...'
            inputType={'name'}
            height='70px'
            error={erros.name.error}
            errorMessage={erros.name.message}
          />
         
          </div>
        ):(
        <div >
          <InputStandard
            label=''
            height='70px'
            onChange={(ev) => {
              setInputValue({ ...inputValue, email: ev });
              const validation = validations(ev, 'email');
              setErros('email', validation);
            }}
            value={inputValue.email}
            placeholder='Digite um email...'
            inputType={'email'}
            error={erros.email.error}
            errorMessage={erros.email.message}
          />
          <InputStandard
            label=''
            height='70px'
            onChange={(ev) => {
              setInputValue({ ...inputValue, password: ev });
              const validation = validations(ev, 'password');
              setErros('password', validation);
            }}
            value={inputValue.password}
            placeholder='Digite um senha...'
            inputType={'password'}
            error={erros.password.error}
            errorMessage={erros.password.message}
          />
        </div>
      )}
      </>
       }
      
      />
    </div>
  );
}
