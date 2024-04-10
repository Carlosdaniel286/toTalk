import style from './styles/from.module.css'
import { InputStandard } from '../standard_Input/inputs'
import { Button } from '@mui/joy'
import { useCustomInput } from '@/@hooks/inputHooks/inputHooks'
import { useEffect, useState } from 'react'

type propsFormControl ={
  name:boolean ,
  email:boolean ,
  password:boolean  
}

export function FormControl() {
   const{setInputValue, inputValue ,checkInputs}= useCustomInput()
   const [erros, setErros]=useState<propsFormControl>({
     name:false,
     email:false ,
     password:false 
   })
  const slogan = 'compartilhando momentos,construindo conexões, conectando ao mundo'
  useEffect(()=>{
   console.log(erros.name)
   //console.log(erros.email)
  },[erros])
   
  
  return (
      <div className={style.conatiner}>
         <form className={style.from} >
          <header className={style.header}><h1>Crie sua conta</h1></header> 
            <p className={style.slogan}>Crie seu cadastro no toTalk e entre em um novo universo</p>
            <div className={style.conatinerInputs}>
                 <InputStandard
                    label=''
                    onChange={((ev) => setInputValue({...inputValue,name:ev}))} 
                    onCheckError={((error)=> 
                      setErros({...erros,name:error})
                    )}
                    value={inputValue.name} 
                    placeholder='Digite um nome...'
                    inputType={'name'} 
                    height='70px'
                    />
                  <InputStandard
                    label=''
                    height='70px'
                    onChange={((ev) => {setInputValue({...inputValue,email:ev}) })} 
                    onCheckError={((error)=> setErros({...erros,email:error})
                  )}
                    value={inputValue.email} 
                    placeholder='Digite um email...'
                    inputType={'email'} 
                    />
                    
             </div>
             <div className={style.button}> 
              <Button id={style.button} 
               onClick={(()=>{
                console.log('name ' + erros.name)
                console.log('email ' + erros.email)
                 
               })}
              >Proximo</Button>
             </div>
           </form>
        </div>
    )
  }
  