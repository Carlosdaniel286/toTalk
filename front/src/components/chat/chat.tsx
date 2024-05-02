import { InputStandard } from "../standard_Input/inputs"
import SendIcon from '@mui/icons-material/Send';
import style from './style/chat.module.css'
import { Input, Textarea } from "@mui/joy";
export const Chat = ()=>{
  
return(
  <div className={style.body}>
   <Textarea
    id={style.input}
    sx={{
      fontFamily:'myFontRegular',
      fontSize:'1.1rem',
      minHeight:'45px'
    }}
    maxRows={8}
   
   />
   <div  className={style.send}>
   <SendIcon
   style={{
    fontSize:"1.9rem",
    cursor:'pointer'
    }}
    color="primary"
   />
   </div>
  </div>
  )
}