import style from './style/creatPosts.module.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Textarea from '@mui/joy/Textarea';
import { useState } from 'react';
import { Button } from '@mui/joy';

export const CreatPost = () => {
    const[textarea, setTextarea]=useState('')
    const[scroll, setScroll]=useState('auto')
    
    return (
        <div className={style.container}>
        <div className={style.CreatBody}>
          <header className={style.header}><h2>Criar publicação</h2></header>
           <div className={style.user} >
           <AccountCircleIcon
            sx={{paddingRight:'10px',height:'40px',width:'40px'}}
            />
            <p>carlos289</p>
           </div>
           <div className={style.write} >
           <Textarea
            value={textarea}
            
            onChange={((ev)=>setTextarea(ev.target.value))}
             sx={{
            border: '0px', 
            '--Textarea-focusedThickness': '0rem',
            '&:focus-within': {
               color:'rgb(18, 18, 19,0.9)',
               "::placeholder":''
              },
             fontFamily:'myFont',
             fontSize:'1.3rem',
             minHeight:'200px'
             
           }}
             color="neutral"
             disabled={false}
             placeholder={'O que você estar pensando?'}
             size="lg"
             variant="outlined"
             
             id={style.textarea}
             maxRows={11}
          />
        </div>
        <div className={style.button} >
         <Button
          sx={{
            width:'100%'
          }}
         >
            <p className={style.p}>publicar</p>
         </Button>
        </div>
        </div>
        </div>
    );
};
