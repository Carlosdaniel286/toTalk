'use client'
import { FormControl } from "../../components/form/form";
import { InputStandard } from "../../components/standard_Input/inputs";
import { validations } from "@/functions/validations/validation";
import style from './style/login.module.css';
import { initError } from "@/constants";
import { useCustomLogin } from "./hooks/loginHook";
import { Header } from "@/components/header/header";

export  function LoginForm() {
  const { onSubmit, setInputValue, inputValue, setErros, erros } = useCustomLogin()
  return (
    <>
     <Header />
    <div className={style.container}>
      <FormControl
        type='login'
        onSubmit={() => onSubmit()}
        text=""
        buttonText=""
        content={
          <>
            <InputStandard
              label=''
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
              onChange={(ev) => {
                setInputValue({ ...inputValue, password: ev });
                setErros('password', initError);
              }}
              value={inputValue.password}
              placeholder='Digite um senha...'
              inputType={'password'}
              error={erros.password.error}
              errorMessage={erros.password.message}
            />
          </>
        }
      />
    </div>
    </>
  );
}
