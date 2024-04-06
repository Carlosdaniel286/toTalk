import { CSSProperties, useState } from 'react'
import style from './style/moduleCss/contacts.module.css'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
type propsConatcts ={
  type:'email' | 'phone' | 'local',
  content:string
}



export function RegisterContacts({type,content}:propsConatcts) {
 return (
    <div
      className={style.hover}>
      <div className={style.container}>
        <div className={style.containerImage}>
          {type=='email' && <MailOutlineIcon/>}
          {type=='phone' &&<PhoneRoundedIcon/>}
          {type=='local' &&<FmdGoodIcon/>}
        </div>
        <p className={style.content}
         style={{}}
        >{content}</p>
        </div>
    </div>
  )
}
