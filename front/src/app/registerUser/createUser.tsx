'use client'
import style from './styles/register.module.css';
import { InputStandard } from '../../components/standard_Input/inputs';
import { validations } from '@/functions/validations/validation';
import { FormControl } from '../../components/form/form';
import { useCustomRegister } from './hook/resgisterHook';
import { Header } from '@/components/header/header';
import { capitalFirstLetter} from "@/functions/validations/validation";
import { useEffect } from 'react';
export function CreateUser() {
  const {
    onSubmit,
    styles,
    setErros,
    erros,
    inputValue,
    setInputValue,
    onCreateAccount,
    texts,
    inputsConfirmed,
  } = useCustomRegister(style)
 const submit = inputsConfirmed?onSubmit:onCreateAccount
const value = capitalFirstLetter(inputValue.name??'')
 
 
 return (
    <>
      <Header />
    <div className={styles}>
      <FormControl
        type='resgister'
        text={texts.text}
        buttonText={texts.button}
        onSubmit={submit}
        content={
          <>
            {inputsConfirmed ? (
              < div>
                <InputStandard
                  label=''
                  onChange={(ev) => {
                    setInputValue({ ...inputValue, name: ev });
                    const validation = validations(ev, 'name');
                    setErros('name', validation);
                  }}
                  value={value}
                  placeholder='Digite um nome...'
                  inputType={'name'}
                  error={erros.name.error}
                  errorMessage={erros.name.message}
                />

              </div>
            ) : (
              <div >
                <InputStandard
                  label=''
                  onChange={(ev) => {
                    setInputValue({ ...inputValue, email: ev });
                    const validation = validations(ev ,'email');
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
    </>
  );
}
