'use client';

import { Post } from '@/components/post/post';
import style from './style/feed.module.css';
import { Scroll } from '@/components/scroll/scroll';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { posts as PostsType } from '@/@types/post';
import { useUpdatePost } from '@/contexts';
import { apiDeletePost } from './api/api.post';
import { EditPost } from '@/components/editPost/editPost';
import { apiEditPost } from './api/apiEditPost';
import { getPosts } from './api/api.getPosts';
import { v4 as uuidv4 } from 'uuid';

export default function Feed() {
  const router = useRouter();
  const { newPost } = useUpdatePost();
  const [content, setContent] = useState<PostsType[]>();
  const [value, setValue] = useState({
    content: '',
    postId: 0,
    key: '',
  });

  // Função para obter posts
  const handlePosts = useCallback(async () => {
    const posts = await getPosts();
    if (posts) setContent(posts);
  }, []);

  // Carregar posts na montagem inicial
  useEffect(() => {
    handlePosts();
  }, [handlePosts]);

  // Efeito para lidar com novos posts
  useEffect(() => {
    if (newPost) {
      setContent((prevContent) => (prevContent ? [...prevContent, newPost] : [newPost]));
    }
  }, [newPost]);

  // Redirecionar para os comentários de um post
  const handlePostClick = (id: number) => {
    router.push(`/toTalk/feed/comments/post/${id}`);
  };

  // Editar um post existente
  const handleEditPost = async () => {
    const updatedPost = await apiEditPost(value.postId, value.content);
    if (!content || !updatedPost) return;

    // Atualizar o conteúdo do post editado
    const updatedContent = content.map((post) =>
      post.id === value.postId ? { ...post, content: value.content } : post
    );
    const newKey = uuidv4();
    setValue({ ...value, key:newKey});
    setContent(updatedContent);
    setDisplayEditPost(false);
  };

  // Estado e função para exibir o formulário de edição de post
  const [displayEditPost, setDisplayEditPost] = useState<boolean>(false);

  // Lidar com o clique no botão de edição de um post
  const handleEditButtonClick = (post: PostsType) => {
    setValue({
      ...value,
      content: post.content,
      postId: post.id,
      key: '', // Resetar a chave ao editar um novo post
    });
    setDisplayEditPost(true);
  };

  return (
    <main className={style.main}>
      {displayEditPost && (
        <EditPost
          onClose={() => setDisplayEditPost(false)}
          value={value.content}
          onChange={(ev) => setValue({ ...value, content: ev })}
          onClick={handleEditPost}
        />
      )}
      <div className={style.scroll}>
        <Scroll style={{ maxHeight: '94vh' }} renderFloating={true}>
          {content &&
            content.map((item, index) => (
              <div key={`${item.id}-${value.key}`}>
                <Post
                  onClickEdit={() => handleEditButtonClick(item)}
                  isCreator={item.isCreator}
                  content={item}
                  style={{
                    maxWidth: '650px',
                    borderBottom: index === content.length - 1 ? '1px solid rgb(185, 180, 180, 0.4)' : undefined,
                  }}
                  onClick={() => handlePostClick(item.id)}
                  onClickDelete={async () => {
                    const res = await apiDeletePost(item.id);
                    if (res) {
                      setContent((prevContent) => prevContent?.filter((p) => p.id !== item.id));
                    }
                  }}
                />
              </div>
            ))}
        </Scroll>
      </div>
    </main>
  );
}
