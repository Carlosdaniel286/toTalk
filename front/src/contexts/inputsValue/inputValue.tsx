import { propsInputValue } from '@/@types/inputs/inputs';
import { errorValidation } from '@/@types/validations/validations';
import { initInputValidation, initInputValue } from '@/constants';
import React, { createContext, useState, useContext, ReactNode } from 'react';


interface propsConext {
    inputValue :propsInputValue,
    setInputValue: React.Dispatch<React.SetStateAction<propsInputValue>>,
    erros: {
        name: errorValidation;
        lastName: errorValidation;
        phone: errorValidation;
        password: errorValidation;
        email: errorValidation;
    },
     setErro: React.Dispatch<React.SetStateAction<{
        name: errorValidation;
        lastName: errorValidation;
        phone: errorValidation;
        password: errorValidation;
        email: errorValidation;
    }>>
}


const UserContextInputs = createContext< propsConext | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [inputValue, setInputValue] = useState<propsInputValue>(initInputValue);
    const[erros,setErro]=useState(initInputValidation)
  return (
    <UserContextInputs.Provider value={{inputValue, setInputValue,erros,setErro }}>
      {children}
    </UserContextInputs.Provider>
  );
};

// Hook personalizado para usar o contexto do usuário
export const useUser = (): propsConext => {
  const context = useContext(UserContextInputs);
  if (!context) {
    throw new Error('Erro ao usar o conetext ');
  }
  return context;
};
