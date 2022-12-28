import React, {useContext, useState, useEffect} from 'react'
import { AppContext } from '../context/context'
import Post from "./Post"

const PostSection = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const {  getPosts, currentAccount, contract } = useContext(AppContext);

    const fetchPosts = async () => {
      setIsLoading(true);
      const data = await getPosts();
      setPosts(data);
      setIsLoading(false);
    };
  
    useEffect(() => {
       fetchPosts();
    }, [contract]);

  return (
    <div className='text-black flex flex-cols items-center justify-center'>
       <Post
        key={posts?.id}
        title="All Posts"
        isLoading={isLoading}
        posts={posts}
      />
    </div>
  )
}

export default PostSection