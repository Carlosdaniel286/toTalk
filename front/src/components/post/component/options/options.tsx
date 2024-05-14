import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import { P } from '@/components/p/p';
import { CSSProperties } from 'react';
import ModeEditOutlineSharpIcon from '@mui/icons-material/ModeEditOutlineSharp';
type options={
  onClick?:(()=>void)
  onClosed?:(()=>void)
  styles?:CSSProperties
}

export const Options =({onClick,onClosed,styles}:options)=>{
  const click = onClick?onClick:(()=>{})
  const closed= onClosed?onClosed:(()=>{})
   return (
    <div
    style={{
        boxShadow:'0 0 10px rgba(0, 0, 0, 0.1)',
        minHeight:'100px',
        width:'100%',
        borderRadius:"10px",
        background:'white',
        display:'flex',
        flexDirection:'column',
        padding:'8px',
        boxSizing:'border-box',
        ...styles
    }}
    >
        <div
        style={{
         display:'flex'
        }}
        ><P
         style={{
            fontSize:'1.2rem',
            cursor:'pointer',
           
         }}
         onClick={(()=>{
            closed()
         })}
        >X</P></div>
     <List aria-labelledby="decorated-list-demo">
        <ListItem>
        <ListItemDecorator>
            <DeleteForeverIcon
             color='error'
            />
          </ListItemDecorator>
          <P style={{
            cursor:'pointer',
            color:"red"
          }} 
          onClick={(()=>{
            click()
          })}
          >Excluir</P>
          </ListItem>
        <ListItem>
        <ListItemDecorator>
            <ModeEditOutlineSharpIcon/>
          </ListItemDecorator>
        <P style={{
            cursor:'pointer',
            color:'black'
          }} 
          onClick={(()=>{
            click()
          })}
          >Editar</P>
        </ListItem>
      </List>
   </div>
)
}