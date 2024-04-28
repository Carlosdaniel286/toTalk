import { useState } from "react";
import { useCustomInput } from "./inputHooks";
import { errorValidation } from "@/@types/validations/validations";

export const useCustomRegister = (style: { readonly [key: string]: string; }) => {
  const { setInputValue, inputValue, handleInputsEmpty, setErros, erros } = useCustomInput();
  const [inputsConfirmed, setInputsConfirmed] = useState(false);
  const [styles, setStyles] = useState(style.container);
  const [texts, setTexts] = useState({
    text: 'Crie sua conta',
    button: 'próximo'
  });

  const onSubmit = () => {
    const inputsIsEmpty = handleInputsEmpty(inputValue, ['name']);
    if (!inputsIsEmpty && !inputsConfirmed) {
      setStyles(style.transition);
      setTimeout(() => {
        setStyles(style.container);
        setInputsConfirmed(true);
        setTexts({
          ...texts,
          text: 'Termine sua conta',
          button: 'criar conta'
        });
      }, 1000);
      return;
    }

    const isEmptyEmail = handleInputsEmpty(inputValue, ['email']);
    const emptyError: errorValidation = {
      error: true,
      message: 'Existem campos vazios'
    };

    if (isEmptyEmail) {
      setErros('email', emptyError);
    }

    const isEmptyPassword = handleInputsEmpty(inputValue, ['password']);
    if (isEmptyPassword) {
      setErros('password', emptyError);
    }
  };

  return {
    onSubmit,
    inputValue,
    setInputValue,
    erros,
    setErros,
    styles,
    texts,
    inputsConfirmed,

  };
};
