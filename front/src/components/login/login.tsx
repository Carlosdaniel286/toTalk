'use client'
import { useCustomInput } from "@/@hooks/inputHooks/inputHooks";
import { FormControl } from "../form/form";
import { InputStandard } from "../standard_Input/inputs";
import { validations } from "@/functions/validations/validation";
import style from './style/login.module.css';
import { errorValidation } from "@/@types/validations/validations";
import { initError } from "@/constants";

export default function LoginForm() {
  const { setInputValue, inputValue, handleInputsEmpty, setErros, erros } = useCustomInput();
  
  const onSubmit = () => {
    const isEmptyEmail = handleInputsEmpty(inputValue, ['email']);
    const errosValid: errorValidation = {
      error: true,
      message: 'Existem campos vazios'
    };

    if (!isEmptyEmail) {
      setErros("email", errosValid);
    }

    const isEmptyPassword = handleInputsEmpty(inputValue, ['password']);
    if (!isEmptyPassword) {
      setErros('password', errosValid);
    }
  };

  return (
    <div className={style.container}>
      <FormControl
        type='login'
        onSubmit={() => onSubmit()}
        content={
          <>
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
                setErros('password', initError );
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
  );
}
