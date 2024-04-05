import FormLabel from '@mui/material/FormLabel/FormLabel'
import styles from './styles/from.module.css'
import Button from '@mui/joy/Button';

import { InputStandard } from '@/components/inputs/inputs';
export function Form() {
  return (
    <form className={styles.form}>
      <div className={styles.registrations}>
        <div className={styles.containerInputs} >
        <div className={styles.name}>
          <div className={styles.containerInputsNames}><InputStandard 
          label='Primerio Nome'
          placeholder='digite um nome'
          typeValidation='stringName'
          /></div>
          <div className={styles.containerInputsNames}><InputStandard 
           label='Sobrenome'
           placeholder='digite um sobrenome'
           typeValidation='stringName'
          /></div>
        </div>
        <div className={styles.SensitiveInformationForm}>
         <div className={styles.containerInputsSensitiveInformation}><InputStandard 
          label='email'
          placeholder='digite um sobrenome'
          typeValidation='email'
         /></div>
         <div className={styles.containerInputsSensitiveInformation}><InputStandard 
          label='Numero do celular'
          placeholder='digite um sobrenome'
          typeValidation='number'
          /></div>
         <div className={styles.containerInputsSensitiveInformation}><InputStandard 
         label='last name'
         placeholder='digite um sobrenome'
         typeValidation='stringName'
         /></div>
        </div>
        <div  className={styles.conatinerbutton}>
        <Button className={styles.button} variant="solid">enviar</Button>
        </div>
        </div>
        
      </div>
    </form>
  )
}
