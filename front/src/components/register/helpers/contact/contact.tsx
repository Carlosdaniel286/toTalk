import styles from './styles/contact.module.css'
import { Contacts } from '@/components/contacts/contacts'

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
              <Contacts
                link='/telefone'
                content='897875564543'
              /></div>
               <div className={styles.conatinerContacts} >  
              <Contacts
                link='/telefone'
                content='897875564543'
              /></div>
               <div className={styles.conatinerContacts} >  
              <Contacts
                link='/telefone'
                content='897875564543'
              /></div>
            
               
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
