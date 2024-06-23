'use client';

import { Post } from '@/components/post/post';
import style from './style/feed.module.css';
import { Scroll } from '@/components/scroll/scroll';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { posts as PostsType } from '@/@types/post';
import { useUpdatePost } from '@/contexts';
import { apiDeletePost } from './api/api.post';
import { useEditPostContext } from '@/contexts';
import { EditPost } from '@/components/EditPost/editPost';
export function Feed({ posts }: { posts: PostsType[] }) {
  const router = useRouter();
  //const{displayEditPost,toggleEditPost}=useEditPostContext()
  const [content, setContent] = useState<PostsType[]>(posts);
  const { newPost} = useUpdatePost();
  const [value, setValue] = useState<string>('');
  const [displayEditPost, setDisplayEditPost] = useState<boolean>(false);
  
  
  useEffect(() => {
    if (newPost) {
      setContent((prevContent) => [newPost, ...prevContent]);
    }
  }, [newPost]);

  // Função para navegar para a página de comentários de um post específico
  const handlePostClick = (id: number) => {
    console.log(id);
    router.push(`/toTalk/feed/comments/post/${id}`);
  };

  return (
    <main className={style.main}>
             <>
             {displayEditPost &&
               <EditPost
                onClose={(()=>setDisplayEditPost(false))}
                 value={value}
                 onChange={((ev)=>{
                  setValue(ev)
                 })}
               />
                }
              </>
    <div className={style.scroll}>
        <Scroll
          style={{ maxHeight: '94vh' }}
          renderFloating={true}
        >
          {content.map((item, index) => (
            <div key={item.id}>
               
              
              <Post
              onClickEdit={(()=>{
                setDisplayEditPost(true)
                console.log(item.content)
                setValue(item.content)
              })}
             isCreator={item.isCreator}
                content={item}
                style={{
                  maxWidth: '650px',
                  borderBottom: index === content.length - 1
                    ? '1px solid rgb(185, 180, 180, 0.4)'
                    : undefined,
                }}
                onClick={() => handlePostClick(item.id)}
                onClickDelete={(async()=>{
                 const res = await apiDeletePost(item.id)
                    if(!res) return
                    setContent(prevContent => {
                      const deletedPost = [...prevContent];
                      deletedPost.splice(index, 1);
                      return deletedPost;
                    });
                })}
              />
            </div>
              
          ))}
        </Scroll>
      </div>
    </main>
  );
}
