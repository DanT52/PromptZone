"use client"

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Profile from '@components/Profile'
import Image from 'next/image'
import ShowMore from '@components/ShowMore'



const MyProfile = ( {params }) => {
    const searchParams = useSearchParams();
    const userName = searchParams.get("name");

    const [posts, setPosts] = useState([])

    const [shownPosts, setShownPosts] = useState([])

    const [loading, setLoading] = useState(true)
    const [limit, setLimit] = useState(10)

  

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();
  
      setPosts(data);
      setShownPosts(data.slice(0,limit))
      setLoading(false)
    };
    if(params?.id)fetchPosts();
  }, [params?.id]);

  useEffect(() => {
    setShownPosts(posts.slice(0,limit))
  }, [limit])

 

  return (

    <div>
       <Profile
      name={`${userName}'s`}
      desc={`Welcome to ${userName}'s  profile page`}
      data={shownPosts}
      
    />

{loading && (
      <div className=' w-full flex-center'>
      <h2 className='w-full flex-center text-black dark:text-white text-xl font-bold mt-10'> Loading...</h2>
    </div>
    )}

<ShowMore 
      pageNumber={limit / 10}
      isNext={limit  > shownPosts.length}
      setLimit={setLimit}
        />

    </div>

   
    
  )
}

export default MyProfile