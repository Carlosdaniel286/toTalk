import style from './styles/form.module.css';
import { Button } from '@mui/joy';
import Link from 'next/link';
import {useState } from 'react';
type propsFormControl={
    type:'resgister'|'login'
    onSubmit:(()=>void),
    content:React.ReactNode
}


export function FormControl({type,onSubmit,content}:propsFormControl) {
  const [text, setText] = useState({
    text:'Crie sua conta',
    buttonText:'Próximo',
  });
 
  return (
      <form className={style.form}>
        <header className={style.header}>
          <h1>{ type=='login'? 'Login': text.text}</h1>
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
             if(type=='login') return
             setTimeout(() => {
              setText({...text,text:'Termine sua conta',
              buttonText:'Criar conta'
            })
              }, 1000);
            
           
             
            }}
          >
          {type=='login'? 'Entrar': text.buttonText}
          </Button>
          <nav className={style.nav}>
            <ul>
              <Link href={type=='login'?`/${'register'}`:`/${'login'}`}>
                <li > {type=='login'? 'Não tenho conta': 'ja tenho conta'}</li>
              </Link>
            </ul>
          </nav>
        </div>
      </form>
   );
}
