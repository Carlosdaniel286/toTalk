'use client'

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MenuIcon from '@mui/icons-material/Menu';
import { Options } from './component/options/options';
import { Overlay } from '../overlay/overlay';
import styles from './style/post.module.css';
import { P } from '../p/p';
import { usePostCustom } from './hooks/hookPosts';
import { propsPost } from '@/@types/post';


export function Post({ content, id, style, onClick, renderFullPost ,typePost}: propsPost) {
  const type = typePost==undefined?'post':typePost
  const {options,elementPosition,setOptions,elementRef,showFullContent}=usePostCustom(content.content,renderFullPost)
 
  return (
    <div id={id} className={styles.BodyPost} style={style}>
      <header className={styles.header}>
        <div className={styles.user}>
          <AccountCircleIcon sx={{ paddingRight: '10px', fontSize: '2.4rem' }} />
          <h4>{content.author}</h4>
        </div>
        <div className={styles.moment}>
          <P style={{ color: 'rgba(68, 65, 65, 0.5)', fontSize: '0.8rem' }}>{content.createdAt}</P>
        </div>
        <div className={styles.option}>
          {options && elementPosition && (
            <Overlay
            background='none'
          onClose={(()=>{
            setOptions(false);
          })}
            >
              <div
                className={styles.options}
                style={{
                  position: 'absolute',
                  top: `${elementPosition.top-26}px`,
                  left: `${elementPosition.left-170}px`,
                  right: `${elementPosition.right}px`,
                  bottom: `${elementPosition.bottom}px`
                }}
              >
                <Options
                  styles={{
                   height: '100%'
                  }}
                  onClick={() => {
                    setOptions(!options);
                  }}
                  onClosed={() => {
                    setOptions(!options);
                  }}
                />
              </div>
            </Overlay>
          )}
          <div onClick={() => {
            setOptions(!options);
          }} ref={elementRef}>
            <MenuIcon sx={{ cursor: 'pointer' }} />
          </div>
        </div>
      </header>
      <div className={styles.contentPost}>
        <P id={styles.content} style={{ fontFamily: 'myFontRegular' }}>{showFullContent.content}</P>
        <P id={styles.more} style={{ color: 'rgb(68, 65, 65)', fontSize: '1rem' }}
          onClick={() => {
           if (onClick) onClick();
          }}>{content.content.length <= 600 ? '' : showFullContent.textFull}</P>
      </div>
      <div className={styles.containerReaction}>
        {//type!=='comments' && 
        <div 
         style={{
          display:'flex',
          alignItems:'center'
         }}
        >
        <ChatBubbleOutlineIcon
          sx={{
            cursor: 'pointer',
            fontSize: '1.1rem',
          }}
          onClick={() => {
            if (onClick) onClick();
          }}
        />
        </div>
}
        <div className={styles.info}>
          <FavoriteBorderIcon
            sx={{
              cursor: 'pointer',
              fontSize: '1.1rem'
            }}
            color='error'
          />
          <P style={{ fontSize: '1rem', color: 'rgb(185, 180, 180)', fontFamily: 'myFontRegular'}}>10</P>
        </div>
      </div>
    </div>
  );
}
