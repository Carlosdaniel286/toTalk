'use client'

import React, { useState } from 'react';
import styles from './style/resgiter.module.css';
import { Contact } from './helpers/contact/contact';
import { Form } from './helpers/from/from';

export function Register() {
  return(
   <main className={styles.main}>
      <header className={styles.header}></header>
       <div className={styles.formContainer }>
        <Contact/>
         <Form/>
      </div>
    </main>
  )
};



