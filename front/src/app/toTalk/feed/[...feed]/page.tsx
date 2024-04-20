'use client'
import { Post } from '@/components/post/post';
import style from './style/feed.module.css'
import { Scroll } from '@/components/scroll/scroll';
import { Overlay } from '@/components/overlay/overlay';
import { CreatPost } from '@/components/creatPosts/creatPosts';
import { useState } from 'react';
import { useSidebar } from '@/contexts';
import { Sidebar } from '@/components/sidebar/sidebar';

export default function Feed() {
const { displayCreatePost, toggleDisplayCreatePost } = useSidebar();
  
return (
    <main className={style.main}>
     <header className={style.header}>
        <Sidebar
        height='50px'
        width='100vh'
        />
      </header> 
      {displayCreatePost &&
      <Overlay 
      onClose={(()=> 
        toggleDisplayCreatePost(!displayCreatePost)
      )}
       >
        <CreatPost />
      </Overlay>
       }
   <div className={style.scroll} >
    <Scroll
     contentStyle={style.contentStyle}
     maxHeight='90vh'
    >
      <Post
      content='Para navegadores Firefox, você usaria propriedades similares com o prefixo ::-moz-scrollbar.

      Lembre-se de que a estilização da scrollbar é um recurso não padrão e pode não ser suportada em todos os navegadores ou em todas as versões dos navegadores. Além disso, a aparência da scrollbar pode variar em diferentes sistemas operacionais e dispositivos.
      
      Se você precisar de uma solução mais robusta e compatível com mais navegadores, pode considerar o uso de bibliotecas JavaScript ou plugins específicos para estilizar a scrollbar, como "simplebar" ou "perfect-scrollbar". Essas bibliotecas oferecem opções mais avançadas de personalização e geralmente são mais compatíveis com uma variedade de navegadores e dispositivos.
      Para navegadores Firefox, você usaria propriedades similares com o prefixo ::-moz-scrollbar.

      Lembre-se de que a estilização da scrollbar é um recurso não padrão e pode não ser suportada em todos os navegadores ou em todas as versões dos navegadores. Além disso, a aparência da scrollbar pode variar em diferentes sistemas operacionais e dispositivos.

       Se você precisar de uma solução mais robusta e compatível com mais navegadores, pode considerar o uso de bibliotecas JavaScript ou plugins específicos para estilizar a scrollbar, como "simplebar" ou "perfect-scrollbar". Essas bibliotecas oferecem opções mais avançadas de personalização e geralmente são mais compatíveis com uma variedade de navegadores e dispositivos.'
     
      />
      <Post
      content='kenrgjengkjbejfbhdsjvbfherfgef eghfherfi erferufh eruifheuir'
     
      
      />
    </Scroll>
   </div>
   </main>
  );
}


