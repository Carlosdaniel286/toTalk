import styles from './styles/contact.module.css'
import { RegisterContacts } from '@/components/Register_contacts/register_contacts'

export function Contact() {
  return (
    <div className={styles.contact}>
      <div className={styles.containerInfo}>
       <div className={styles.info}>
          <header>
            <h2 className={styles.contact_h2}>Contate-nos</h2>
            <p className={styles.contact_p}>
              Estamos sempre disponíveis para ajudar! Se você tiver alguma
              dúvida.
            </p>
          </header>
          <section className={styles.sections_contacts}>
            <div className={styles.options_contacts}>
             <div className={styles.conatinerContacts} >  
              <RegisterContacts
               type='phone'
                content='+55 (62)9 94809880'
              /></div>
               <div className={styles.conatinerContacts} >  
              <RegisterContacts
                type='email'
                content='carlosdaniiel286@gmail.com'
              /></div>
               <div className={styles.conatinerContacts} >  
              <RegisterContacts
                type='local'
                content='Qualquer lugar'
              /></div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
