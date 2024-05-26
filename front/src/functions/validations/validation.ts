
import { typeValidations, errorValidation, inputType } from '@/@types/validations';
import validator from 'validator';
import { initError } from '@/constants';
import { z } from 'zod';
interface validations extends typeValidations {
    value: string
}
const lettersOnlyRegex = /^[a-zA-Z]+$/;
const name= z.string({message:'no nome'}).regex(lettersOnlyRegex).optional()
const phone= z.string({message:'no phone'}).min(8).optional()// Altere o valor mínimo conforme necessário
const password= z.string({message:'no pass'}).min(6).optional()// Altere o valor mínimo conforme necessário
const email= z.string({message:'no emial'}).email().optional()

export const schema = z.object({
    name,
    phone, // Altere o valor mínimo conforme necessário
    password,// Altere o valor mínimo conforme necessário
    email
  });


export const validations = (value: string,inputType: inputType): errorValidation => {
  
    if (value?.trim()=='') return initError
    switch (inputType) {
        case 'name':
            return isName(value);
        case 'email':
            return isEmail(value);
        case 'phone':
            return isMobilePhone(value);
        case 'password':
            return isStrongPassword(value)
        default:
            return initError
    }
};

export const isName = (value: string): errorValidation => {
  if (name.safeParse(value).success) {
        return initError
    } else {
        return {
            error: true,
            message: 'Apenas letras são permitidas'
        };
    }
};

export const isEmail = (value?: string): errorValidation => {
    if (email.safeParse(value).success) {
        return initError
    } else {
        return {
            error: true,
            message: 'Esse email não é válido'
        };
    }
};

export const isMobilePhone = (value?: string): errorValidation => {
   if (phone.safeParse(value).success) {
        return initError
    } else {
        return {
            error: true,
            message: 'Não é um número de celular válido'
        };
    }
};
export const isStrongPassword = (value?: string): errorValidation => {
    if (password.safeParse(value).success) {
        return initError
    } else {
        return {
            error: true,
            message: 'caracteres especiais e letras maiúsculas.'
        };
    }
};

export const isEmpty = (value: string): errorValidation => {
    if (value.trim()!=='') {
        return initError
    } else {
        return {
            error: true,
            message: 'campo vazio.'
        };
    }
};





// Schema de validação

