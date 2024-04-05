import FormLabel from '@mui/joy/FormLabel';
import style from './styles/input.module.css';
import FormControl from "@mui/joy/FormControl";
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import Input from '@mui/joy/Input';
import FormHelperText from '@mui/joy/FormHelperText';
import Stack from '@mui/joy/Stack';
import { useEffect, useState } from 'react';
import { typeValidations,errorValidation } from '@/@types/validations/validations';
import { validations } from '@/functions/validations/validation';
import { initError } from '@/constants/validations';
import { useForm } from 'react-hook-form';
import { z } from "zod";

interface propsInputStandard extends typeValidations{
  label: string,
  placeholder: string,
  
}
const userSchema = z.object({
  username: z.string().regex(/^[A-Za-z]+$/, {
    message: 'O nome deve conter apenas letras.',
   }).trim().transform((name)=>{
        return name.charAt(0).toUpperCase()
   }),
   lastName:z.string().regex(/^[A-Za-z]+$/, {
    message: 'O sobrenome deve conter apenas letras.',
   }).transform((name)=>{
       const split = name.split(' ').map((item)=>{
         return item.charAt(0).toUpperCase()
         
        })
        
      return split.join(' ')
        
   }),
   email:z.string().email('email invalido').toLowerCase(),
   password:z.string().min(6,'no minimo 6 caracters')
   
  });

export function InputStandard({ label, placeholder,typeValidation }: propsInputStandard) {
  const [inputValue, setInputValue] = useState<string>('');
  const [errorState, setErrorState] = useState<errorValidation>(initError);
  
  useEffect(()=>{
     const checkInputs = validations({value:inputValue,typeValidation})
      setErrorState({...errorState,isError:checkInputs.isError,
      errorMessage:checkInputs.errorMessage
    })
    console.log(inputValue,typeValidation)
  },[typeValidation,inputValue])

return (
    <>
      <Stack spacing={2}>
        <FormControl error={errorState.isError}  className="form-control">
          <FormLabel className={style.label}>{label}</FormLabel>
          <Input
             value={inputValue}
            onChange={((ev)=>{setInputValue(ev.target.value)})}
            id={style.input}
            error={errorState.isError}
            defaultValue={errorState.errorMessage}
            placeholder={placeholder}
            style={{
              fontFamily: 'myFont',
              textTransform: 'capitalize',
              fontSize: '17px',
              height: '40px',
              textDecoration: 'none'
            }}
            sx={{
              color: 'black',
               textTransform: 'capitalize',
              '&:focus-within': {
               '--Input-focusedHighlight': errorState.isError ? 'red' : 'black',
               color: errorState.isError ? 'red' : 'black',
              },
            }}
          />
          {errorState.isError &&
          <FormHelperText>
            <InfoOutlined />
            {errorState.errorMessage}
          </FormHelperText>
           }
        </FormControl>
      </Stack>
    </>
  );
}
