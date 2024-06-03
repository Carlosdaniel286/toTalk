'use client';

import { Post } from '@/components/post/post';
import style from './style/feed.module.css';
import { Scroll } from '@/components/scroll/scroll';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { posts } from '@/@types/post';
import { useUpdatePost } from '@/contexts';
import { Suspense } from 'react';
import Loading from './loading';

export function Feed({ posts }: { posts: posts[] }) {
  const router = useRouter();
  const [content, setContent] = useState<posts[]>(posts);
  const { newPost } = useUpdatePost();

  useEffect(() => {
    if (!newPost) return;
    const updatedPosts = [newPost, ...content];
    setContent(updatedPosts);
  }, [newPost]);

  return (
    <main className={style.main}>
      <div className={style.scroll}>
        <Scroll
          style={{
            maxHeight: '94vh',
          }}
          renderFloating={true}
        >
        
          {content.map((item, index) => (
            <div key={item.id}>
              <Post
                content={item}
                style={{
                  maxWidth: '650px',
                  borderBottom:
                    index === content.length - 1
                      ? '1px solid rgb(185, 180, 180,0.4)'
                      : undefined,
                }}
                onClick={() => {
                  console.log(item.id);
                  // router.push(`/toTalk/feed/comments/${item.id}`)
                }}
              />
            </div>
            ))}
         
        </Scroll>
      </div>
    </main>
  );
}
