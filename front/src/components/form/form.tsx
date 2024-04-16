import style from './styles/form.module.css';
import { Button } from '@mui/joy';
import Link from 'next/link';
import {useState } from 'react';
type propsFormControl={
    type:'resgister'|'login'
    onSubmit:(()=>void),
    content:React.ReactNode,
    text:string,
    buttonText:string,
}
export function FormControl({type,onSubmit,content,text,buttonText}:propsFormControl) {
  return (
      <form className={style.form}>
        <header className={style.header}>
          <h1>{ type=='login'? 'Login': text}</h1>
        </header>
        <p className={style.slogan}> {type=='login'? 'Entre na sua conta': 'Crie seu cadastro no toTalk e entre em um novo universo'}</p>
         <div className={style.conatinerInputs}>
         {content}
         </div>
         <div className={style.button}>
          <Button
             id={style.button}
             onClick={() => {
             onSubmit()
            }}
          >
          {type=='login'? 'Entrar': buttonText}
          </Button>
          <nav className={style.nav}>
            <ul>
              <Link href={type=='login'?`/${'register'}`:`/${'login'}`}>
                <li > {type=='login'? 'Não tenho conta': 'já tenho conta'}</li>
              </Link>
            </ul>
          </nav>
        </div>
      </form>
   );
}
