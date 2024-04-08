import style from './styles/from.module.css'
import { InputStandard } from '../standard_Input/inputs'
import { Button } from '@mui/joy'
export function FormControl() {
   
return (
      <div className={style.conatiner}>
         <form className={style.from} >
          <header className={style.header}><h1>Crie sua conta</h1></header> 
            <div className={style.conatinerInputs}>
                <InputStandard
                    label=''
                    onChange={((ev) => { })} 
                    value={''} 
                    placeholder='Digite um nome...'
                    inputType={'name'} 
                    height='55px'
                    />
                     <InputStandard
                    label=''
                    height='55px'
                    onChange={((ev) => { })} 
                    value={''} 
                    placeholder='Digite um email...'
                    inputType={'email'} 
                    />
             </div>
             <div className={style.button}> 
              <Button id={style.button} >Proximo</Button>
             </div>
           </form>
        </div>
    )
  }
  