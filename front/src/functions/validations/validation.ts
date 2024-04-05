//import { validations } from './validation';
import { typeValidations, errorValidation } from '@/@types/validations/validations';
import validator, { isEmpty } from 'validator';
import { initError } from '@/constants/validations';
import { z } from 'zod';

interface validations extends typeValidations{
  value:string
}
const userSchema = z.object({
    username: z.string().regex(/^[A-Za-z]+$/, {
      message: 'O nome deve conter apenas letras.',
     }).trim().transform((name)=>{
          return name.charAt(0).toUpperCase()
     }),
})
type User = z.infer<typeof userSchema>;
export const validations = ({value,typeValidation}:validations): errorValidation => {
   if(value=='') return initError
    switch (typeValidation) {
         case 'stringName':
            return isName(value);
        case 'email':
            return isEmail(value);
        case 'number':
            return isMobilePhone(value);
        
                  
         default:
            return initError
    }
};

const isName = (value: string): errorValidation => {
    console.log(validator.isAlpha(value))
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
    if (validator.isMobilePhone(value, 'pt-BR')) {
        return initError
    } else {
        return {
            isError: true,
            errorMessage: 'Não é um número de celular válido'
        };
    }
};
