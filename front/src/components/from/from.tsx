import style from './styles/from.module.css';
import { InputStandard } from '../standard_Input/inputs';
import { Button } from '@mui/joy';
import { useCustomInput } from '@/@hooks/inputHooks/inputHooks';
import { useEffect } from 'react';
import { validations } from '@/functions/validations/validation';

export function FormControl() {
  const { setInputValue, inputValue, setErros, erros, handle } = useCustomInput();

  useEffect(() => {
    console.log(erros);
  }, [erros]);

  return (
    <div className={style.container}>
      <form className={style.form}>
        <header className={style.header}>
          <h1>Crie sua conta</h1>
        </header>
        <p className={style.slogan}>Crie seu cadastro no toTalk e entre em um novo universo</p>
        <div className={style.conatinerInputs}>
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
        </div>
        <div className={style.button}>
          <Button
            id={style.button}
            onClick={() => {
              const check = handle(['name', 'email']);
              console.log(check);
            }}
          >
            Proximo
          </Button>
        </div>
      </form>
    </div>
  );
}
