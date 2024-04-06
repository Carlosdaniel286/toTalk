'use client'

import React, { useEffect, useState } from 'react'
import style from './style/resgiter.module.css'
import { Contact } from './helpers/contacts/contacts'
import { StandardContainer } from '../standard_container/standardContainer'
import { InputStandard } from '../standard_Input/inputs'
import Button from '@mui/joy/Button'
import { useCustomInput } from '@/@hooks/inputHooks/inputHooks'


export function Register() {
  const{inputValue,getValueInput}=useCustomInput()
  
  
  
return (
    <div className={style.conatiner}>
      <StandardContainer
        container={
          <div className={style.conatiner_grid}>
            <div className={style.contact}>
              <Contact />
            </div>
            <div className={style.children}>
              <InputStandard
                label="Primerio Nome"
                placeholder="Digite um nome"
                inputType={'name'}
                id={style.inputTop}
                getValueInput={((value,valid,inputType)=>{
                  getValueInput({value,valid,inputType})
                })}
              cleanInput={false}
             />
              <InputStandard
                label="sobrenome"
                placeholder="digite um sobrenome"
                inputType="lastName"
                id={style.inputTop}
                getValueInput={((value,valid,inputType)=>{
                  getValueInput({value,valid,inputType})
                })}
                cleanInput={false}
               
              />
              <InputStandard
                label="email"
                placeholder="digite uma senha forte"
                inputType="email"
                id={style.inputDown}
                getValueInput={((value,valid,inputType)=>{
                  getValueInput({value,valid,inputType})
                })}
                cleanInput={false}
              />
              <InputStandard
                label="Numero do celular"
                placeholder="digite um numero valido"
                inputType="numberPhone"
                id={style.inputDown}
                getValueInput={((value,valid,inputType)=>{
                  getValueInput({value,valid,inputType})
                })}
                cleanInput={false}
              />
              <InputStandard
                label="senha"
                placeholder="digite uma senha forte"
                inputType="password"
                id={style.inputDown}
                getValueInput={((value,valid,inputType)=>{
                  getValueInput({value,valid,inputType})
                })}
                cleanInput={false}
              />
              <div className={style.conatinerbutton}>
                <Button id={style.button} variant="solid"
                  onClick={(()=>{
                    console.log(inputValue)
                  })}
                >
                  enviar
                </Button>
              </div>
            </div>
          </div>
        }
        // style={style.children}
      />
    </div>
  )
}
