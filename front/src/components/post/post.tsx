'use client';

// Importando ícones do Material UI
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MenuIcon from '@mui/icons-material/Menu';
import { Options } from './component/options/options';
import { P } from '../p/p';
import styles from './style/post.module.css';
import { usePostCustom } from './hooks/hookPosts';
import { propsPost } from '@/@types/post';

import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';




export function Post({
   style,
   content, 
    onClick, 
   renderFullPost, 
   typePost,
   isCreator,
   onClickDelete,
   onClickEdit,
   countComments,
   liked,
   countLiked
  }: propsPost) {
 const { options, setOptions, optionsRef, showFullContent } = usePostCustom(content?.content, renderFullPost);
 

 
 return (
     
    <div  className={styles.BodyPost} style={style}>
      <header className={styles.header}>
        <div className={styles.user}>
          {/* Ícone de perfil do usuário */}
          <AccountCircleIcon sx={{ paddingRight: '10px', fontSize: '2.4rem' }} />
          <h4>{content?.author}</h4>
        </div>
        <div className={styles.moment}>
          {/* Data de criação do post */}
          <P style={{ color: 'rgba(68, 65, 65, 0.5)', fontSize: '0.8rem' }}>{content?.createdAt}</P>
        </div>
        <div className={styles.option}>
          {/* Renderização condicional do menu de opções */}
          {options && isCreator && (
               <div className={styles.options}
                ref={optionsRef}
               >
                <Options
                  styles={{ height: '100%' }}
                  onClickDelete={(()=>{
                    setOptions(!options)
                    if(onClickDelete)onClickDelete()
                   })}
                  onClosed={() => setOptions(!options)}
                  onClickEdit={(()=>{
                    setOptions(!options)
                    if(onClickEdit)onClickEdit()
                      
                  })}
                />
              </div>
             )}
          {/* Ícone do menu de opções */}
          <div onClick={() => setOptions(!options)}>
            <MenuIcon sx={{ cursor: 'pointer' }} />
          </div>
        </div>
      </header>
      <div className={styles.contentPost}>
        {/* Conteúdo do post */}
        <P id={styles.content} style={{ fontFamily: 'myFontRegular' }}>{showFullContent.content}</P>
        {/* Texto de "ver mais" se o conteúdo for longo */}
        <P id={styles.more} style={{ 
          color: 'rgb(68, 65, 65)', 
          fontSize: '1rem',
          
          
          }} onClick={onClick}>
        {content && content.content.length <= 600 ? '' : showFullContent.textFull} 
        </P>
      </div>
      <div className={styles.containerReaction}>
        
       
          <div className={styles.comments}
          
          >
            <ChatBubbleOutlineIcon
              sx={{ cursor: 'pointer', fontSize: '1.1rem',color: 'rgb(185, 180, 180)' }}
              
              onClick={onClick}
            />
             <P style={{ fontSize: '1rem', color: 'rgb(185, 180, 180)', 
              fontFamily: 'myFontRegular',
              marginLeft:'10px' 
              
              }}>
              {countComments}
             </P>
          </div>
        
        <div className={styles.info}>
         {liked? (
          <FavoriteRoundedIcon 
           cursor={'pointer'}
           
           sx={{ cursor: 'pointer', 
            fontSize: '1.1rem' ,
            fill:'red',
            marginLeft:'10px' 
          }}
          // FavoriteBorderIcon 
          />
          ):(
            <FavoriteBorderIcon  
           cursor={'pointer'}
          sx={{ cursor: 'pointer', 
            fontSize: '1.1rem' ,
            fill:'rgb(185, 180, 180)',
            marginLeft:'10px' 
          }}
           
          />
        )}
         
          <P style={{
             fontSize: '1rem', 
             color: 'rgb(185, 180, 180)', 
             fontFamily: 'myFontRegular' ,
             marginLeft:'10px'
             }}>{countLiked?countLiked:0}</P>
        </div>
      </div>
    </div>
       
  );
}
