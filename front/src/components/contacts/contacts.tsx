import { CSSProperties, useState } from 'react'
import style from './style/moduleCss/contacts.module.css'
import { initStyles } from './style/objectStyles/objectStyles'
import Image from 'next/image'

type propsConatcts ={
  link:string,
  content:string
}



export function Contacts({link,content}:propsConatcts) {
  const [isHovered, setIsHovered] = useState(false)
  const [toggleIcone, setToggleIcone] = useState(`${link}Black.png`)
   const handleMouseEnter: CSSProperties = { ...initStyles, background: 'black',color:'white' }
 
   const styles = isHovered ? handleMouseEnter : initStyles
 
   return (
    <div
      style={styles}
      onMouseEnter={() => {
        setToggleIcone(`${link}.png`)
        setIsHovered(true)
      }}
      onMouseLeave={() => {
        setToggleIcone(`${link}Black.png`)
        setIsHovered(false)
      }}
    >
      <div className={style.container}>
        <div className={style.containerImage}>
          <Image
            width={24}
            height={24}
            alt=""
            src={toggleIcone}
           />
        </div>
        <p className={style.content}
         style={{color:styles.color}}
        >{content}</p>
        </div>
    </div>
  )
}
