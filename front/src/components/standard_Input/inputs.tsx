import FormLabel from '@mui/joy/FormLabel';
import style from './styles/input.module.css';
import FormControl from "@mui/joy/FormControl";
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import Input from '@mui/joy/Input';
import FormHelperText from '@mui/joy/FormHelperText';
import Stack from '@mui/joy/Stack';
import { ChangeEvent, useEffect, useState } from 'react';
import { typeValidations,errorValidation } from '@/@types/validations/validations';
import { validations } from '@/functions/validations/validation';
import { initError } from '@/constants/validations';
type typeValidation = 'email' | 'numberPhone' | 'name' | 'password'| 'lastName' | undefined;

interface propsInputStandard extends typeValidations{
  label?: string,
  placeholder?: string,
  id?:string,
  getValueInput:((value:string,valid:boolean,inputType:typeValidation)=>void),
  cleanInput?:boolean,
  }

export function InputStandard({ label, placeholder,inputType,id,getValueInput,cleanInput }: propsInputStandard) {
  const [inputValue, setInputValue] = useState<string>('');
  const [errorState, setErrorState] = useState<errorValidation>(initError);
  

const onChange=(ev: ChangeEvent<HTMLInputElement>)=>{
  const value = ev.target.value
    setInputValue(value)
  }
useEffect(()=>{
  const checkInputs = validations({value:inputValue,inputType})
  setErrorState({...errorState,isError:checkInputs.isError,
  errorMessage:checkInputs.errorMessage
})
getValueInput(inputValue,checkInputs.isError,inputType)
 

},[inputType,inputValue])
  
  return (
    <>
      <Stack spacing={0}  id={id}>
        <FormControl error={errorState.isError}
        sx={{width:'100%'}}
        >
          <FormLabel  className={style.label}
           sx={{fontWeight:'1000',fontSize:'16px',fontFamily: 'myFont',wordBreak:'break-all'}}
          >{label}</FormLabel>
          <Input
           value={inputValue}
            type={inputType}
            onChange={((ev)=>onChange(ev))}
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
          
          <FormHelperText sx={{
            display:'flex',
            alignItems:'center',
            justifyItems:'center',
            justifyContent:'center',
            margin:'0px',
            height:'24px',
            marginBottom:'5px',
            paddingleft:'20px',
            width:"100%",
           
          }} >
         {errorState.isError && <InfoOutlined />}
          <p className={style.error}>{errorState.errorMessage}</p>
            </FormHelperText>
         </FormControl>
      </Stack>
    </>
  );
}
