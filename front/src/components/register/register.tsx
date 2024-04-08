'use client'

import React, { useEffect, useState } from 'react'
import style from './style/resgiter.module.css'
import { useCustomInput } from '@/@hooks/inputHooks/inputHooks'
import { FormControl } from '../from/from'
export function Register() {
  const{inputValue,setInputValue,checkInputs}=useCustomInput()
  
  
  
  return (
    <div className={style.conatiner}>
      <header className={style.header}><h1>toTalk</h1></header>
       <div className={style.from}>
         <FormControl/>
        </div> 
      </div>
  )
}
