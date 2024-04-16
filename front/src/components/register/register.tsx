'use client'
import style from './styles/register.module.css';
import { InputStandard } from '../standard_Input/inputs';
import { validations } from '@/functions/validations/validation';
import { FormControl } from '../form/form';
import { useCustomRegister} from '@/@hooks';

export function RegisterFrom() {
   const{
    onSubmit,
    styles,
    setErros,
    erros,
    inputValue,
    setInputValue,
    texts,
    inputsConfirmed,
    }=useCustomRegister(style)
  
  
return (
    <div className={styles}>
      <FormControl
       type='resgister'
       text={texts.text}
       buttonText={texts.button}
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
