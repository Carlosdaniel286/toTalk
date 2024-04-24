'use client'
import { useSidebar } from '@/contexts';
import style from './style/sidebar.module.css';
import PostAddRoundedIcon from '@mui/icons-material/PostAddRounded';
import { SiderBarCreatePost } from './components/siderCreatePost/siderCreatePost';
type propsSidebar={
    height?: string;
    width?: string;  
}


export const Sidebar = ({height,width}:propsSidebar) => {
   
    return (
        <aside className={style.asideBody}
         style={{
            height:height?height:'600px',
             width: width? width:"300px"
         }}
        >
            <ul className={style.ul}>
                <SiderBarCreatePost/>
            </ul>
        </aside>
    );
};
