//import { validations } from './validation';
import { typeValidations, errorValidation } from '@/@types/validations/validations';
import validator, { isEmpty } from 'validator';
import { initError } from '@/constants/validations';

interface validations extends typeValidations{
  value:string
}

export const validations = ({value,inputType}:validations): errorValidation => {
   if(value=='') return initError
    switch (inputType) {
        case 'name':
            return isName(value);
        case 'lastName':
           return isName(value);
        case 'email':
            return isEmail(value);
        case 'numberPhone':
            return isMobilePhone(value);
        case 'password':
            return isStrongPassword(value)
        default:
            return initError
    }
};

const isName = (value: string): errorValidation => {
   
    if (validator.isAlpha(value)) {
        return initError
    } else {
        return {
            isError: true,
            errorMessage: 'Apenas letras são permitidas'
        };
    }
};

const isEmail = (value: string): errorValidation => {

    if (validator.isEmail(value)) {
        return initError
    } else {
        return {
            isError: true,
            errorMessage: 'Esse email não é válido'
        };
    }
};

const isMobilePhone = (value: string): errorValidation => {
    const validNumberPhone = validator.isMobilePhone(value, 'pt-BR')
    const numberPhoneMin = value.length==11
    if (validNumberPhone && numberPhoneMin ) {
        return initError
    } else {
        return {
            isError: true,
            errorMessage: 'Não é um número de celular válido'
        };
    }
};
const isStrongPassword = (value: string): errorValidation => {
    const isValidPassword = validator.isStrongPassword(value);
    
    if (isValidPassword) {
        return {
            isError: false,
            errorMessage: ''
        };
    } else {
        return {
            isError: true,
            errorMessage: 'caracteres especiais e letras maiúsculas.'
        };
    }
};
