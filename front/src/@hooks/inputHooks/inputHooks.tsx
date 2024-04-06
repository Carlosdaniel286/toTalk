import { useState } from 'react';

interface InputValue {
  value: string;
  valid: boolean;
}

interface CustomInputState {
  name: InputValue;
  lastName: InputValue;
  phone: InputValue;
  password: InputValue;
  email: InputValue;
}

export type PropsCustomInputs={
  value: string;
  valid: boolean;
  inputType: 'email' | 'numberPhone' | 'name' | 'password' | 'lastName' | undefined;
}

export function useCustomInput() {
  const [inputValue, setInputValue] = useState<CustomInputState>({
    name: { value: '', valid: false },
    lastName: { value: '', valid: false },
    phone: { value: '', valid: false },
    password: { value: '', valid: false },
    email: { value: '', valid: false },
  });

  const getValueInput = ({ value, valid, inputType }: PropsCustomInputs) => {
    switch (inputType) {
      case 'name':
        setInputValue((prevInputValue) => ({
          ...prevInputValue,
          name: { value, valid },
        }));
        break;
        case 'lastName':
            setInputValue((prevInputValue) => ({
              ...prevInputValue,
              lastName: { value, valid },
            }));
            break;
      case 'email':
        setInputValue((prevInputValue) => ({
          ...prevInputValue,
          email: { value, valid },
        }));
        break;
      case 'numberPhone':
        setInputValue((prevInputValue) => ({
          ...prevInputValue,
          phone: { value, valid },
        }));
        break;
      case 'password':
        setInputValue((prevInputValue) => ({
          ...prevInputValue,
          password: { value, valid },
        }));
        break;
        case undefined:
         break;
      default:
        break;
    }
  };

  return { inputValue, getValueInput };
}
