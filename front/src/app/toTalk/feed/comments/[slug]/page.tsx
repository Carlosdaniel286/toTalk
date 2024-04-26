'use client'
import { useGetPost } from '@/contexts';
import Feed from '../../[feed]/page';

export default function RenderComments(){
const{getPost}=useGetPost()
const commentsData = [
    { content: 'jhdjedjghjghfgehgrfehgfuygru' },
    { content: 'kjdjhedhiuhruierugeyrydgedygeydfge' },
  ];
   console.log(getPost)
   console.log('server')
  return(
    <>
    <Feed
      post={getPost?[getPost]:[]}
      renderFullPost={true}
      comments={commentsData}
    />
    </>
    
)
}