import style from './style/sidebar.module.css';
import PostAddRoundedIcon from '@mui/icons-material/PostAddRounded';

export const Sidebar = () => {
    return (
        <aside className={style.asideBody}>
            <ul className={style.ul}>
                <li className={style.li}>
                    <div className={style.iconContainer}>
                        <PostAddRoundedIcon
                         style={{
                         width: "40px",
                         height: '40px'
                        }}
                        />
                    </div>
                    <span>Postar</span>
                </li>
            </ul>
        </aside>
    );
};
