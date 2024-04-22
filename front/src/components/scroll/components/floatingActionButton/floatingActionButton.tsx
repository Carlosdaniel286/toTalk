import {useState} from 'react';
import style from './style/floatingActionButtons.module.css'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { SiderBarCreatePost } from '@/components/sidebar/components/siderCreatePost/siderCreatePost';
import { Overlay } from '@/components/overlay/overlay';


export function FloatingActionButtons() {
const[displayFloating,setDisplayFloating]=useState({
    displayOverlay:false,
    displayButtonFloating:true
})
  //!displayFloating
return (
    <div className={style.floatingButtonBody} >
        {displayFloating.displayOverlay && 
        <Overlay
        background='rgb(255, 255, 255,0.8)'
        onClose={(()=>{
            setDisplayFloating({
                ...displayFloating,displayOverlay:!displayFloating.displayOverlay
            })
        })}
        >
       <div className={style.options}>
          <SiderBarCreatePost
          onClose={(()=>{
            setDisplayFloating({
                ...displayFloating,displayOverlay:!displayFloating.displayOverlay,
                displayButtonFloating:!displayFloating.displayButtonFloating,
            })
          })}
          onClick={(()=>{
            setDisplayFloating({
                ...displayFloating,displayButtonFloating:!displayFloating.displayButtonFloating,
            })
          })}
          visible={displayFloating.displayButtonFloating}
          />
        </div>
     </Overlay>
        }
        {displayFloating.displayButtonFloating && 
        <Fab color="primary" aria-label="add" 
         onClick={(()=>{
            setDisplayFloating({
                ...displayFloating,displayOverlay:!displayFloating.displayOverlay
            })
         })}
        >
        <AddIcon />
       </Fab>
      }
      </div>
  );
}
