'use client'
import { useSidebar } from '@/contexts';
import style from './style/sidebar.module.css';
import PostAddRoundedIcon from '@mui/icons-material/PostAddRounded';
type propsSidebar={
    height?: string;
    width?: string;  
}


export const Sidebar = ({height,width}:propsSidebar) => {
    const { displayCreatePost, toggleDisplayCreatePost } = useSidebar();
    return (
        <aside className={style.asideBody}
         style={{
            height:height?height:'600px',
             width: width? width:"300px"
         }}
        >
            <ul className={style.ul}>
                <li onClick={(()=> toggleDisplayCreatePost(!displayCreatePost))} className={style.li}>
                    <div className={style.iconContainer}>
                        <PostAddRoundedIcon
                         style={{
                         width: "40px",
                         height: '40px',
                       
                         
                        }}
                        />
                    </div>
                    <span 
                    style={{color:''}}
                    
                    >POSTAR</span>
                </li>
            </ul>
        </aside>
    );
};
