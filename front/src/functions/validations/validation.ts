import { typeValidations, errorValidation, inputType } from '@/@types/validations';
import { initError } from '@/constants';
import { z } from 'zod';
interface validations extends typeValidations {
    value: string
}

const regex = /^[a-zA-Z\s]+$/
const message = "Apenas letras e espaços são permitidos"
const onlyEspace = /\s{2,}/

const name = z.string().superRefine((ev,ctx)=>{
    const espaceStartsWith = ev.startsWith(' ');
    const testLetter = regex.test(ev);
    const testOnlyEspace = onlyEspace.test(ev)
   if (espaceStartsWith){
        ctx.addIssue({
            code:'custom',
            message,
          });
    }
  
    if (!testLetter){
        ctx.addIssue({
            code:'custom',
            message,
          });
    }
    if (testOnlyEspace){
        ctx.addIssue({
            code:'custom',
            message,
          });
    }
    
    //return true;
}).optional();
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
    const isNames = name.safeParse(value)
   
  if (isNames.success) {
        return initError
    } else {
        return {
            error: true,
            message: isNames.error.issues[0].message
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

export const capitalFirstLetter = (value: string)=> {
   const splitValue = value.split(' ')
   const mapValue = splitValue.map((ev) => {
    return ev.charAt(0).toUpperCase() + ev.slice(1);
});
   return mapValue.join(' ')
};




