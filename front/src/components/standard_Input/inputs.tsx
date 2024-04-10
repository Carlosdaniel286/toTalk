import FormLabel from '@mui/joy/FormLabel';
import style from './styles/input.module.css';
import FormControl from "@mui/joy/FormControl";
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import Input from '@mui/joy/Input';
import FormHelperText from '@mui/joy/FormHelperText';
import Stack from '@mui/joy/Stack';
import { errorValidation,typeValidations} from '@/@types/validations/validations';
import { useEffect, useState } from 'react';
import { initError } from '@/constants';
import { inputType } from '@/@hooks/inputHooks/inputHooks';
import { validations } from '@/functions/validations/validation';
import { SxProps } from '@mui/joy/styles/types/theme';

interface propsInputStandard extends typeValidations{
  label?: string,
  placeholder?: string,
  id?:string,
  onChange:((ev:string)=>void)
  value:string,
  onCheckError?:((error:boolean)=>void),
  height?:string
  
  
}

export function InputStandard({ label, placeholder,id,onChange,value,inputType,height,onCheckError}: propsInputStandard) {
  const[isError ,setIsError]=useState(initError)
  useEffect(()=>{
   // if(value.trim()=='') return
    const erros = validations({value,inputType})
    if(onCheckError!==undefined){
      if(value.trim()==''){
        console.log('sim')
       onCheckError(true)
      }else{
        console.log('nao')
      onCheckError(erros.error)
      }
    }
    setIsError({...erros})
   },[value])
   
   
   
   
   
   
   return (
    <>
      <Stack spacing={0}  id={id}>
        <FormControl error={isError.error}
        sx={{width:'100%'}}
        >
          <FormLabel  className={style.label}
           sx={{fontWeight:'1000',fontSize:'16px',fontFamily: 'myFont',wordBreak:'break-all'}}
          >{label}</FormLabel>
          <Input
           value={value}
           type={inputType}
            onChange={((ev)=>{
              onChange(ev.target.value)
              
            })}
            id={style.input}
            error={isError.error}
            defaultValue={isError.message}
            placeholder={placeholder}
             sx={{ color: 'black',
             fontSize: '17px',
             height: height ? height : '46px' ,
             fontFamily: 'myFont',
             textDecoration: 'none',
             textTransform: 'capitalize',
             '&:focus-within': {
               '--Input-focusedHighlight': isError.error ? 'red' : 'black',
               color: isError.error ? 'red' : 'black',
             },}}
          />
          
          <FormHelperText sx={{
            display:'flex',
            alignItems:'center',
            justifyItems:'center',
            justifyContent:'center',
            margin:'0px',
            height:'20px',
            marginBottom:'1px',
            paddingleft:'20px',
            width:"100%",
          // background:'black'
          }} >
         {isError.error && <InfoOutlined 
          style={{
            fontSize:'0.8rem'
          }}
         />}
          <p className={style.error}>{isError.message}</p>
            </FormHelperText>
         </FormControl>
      </Stack>
    </>
  );
}
