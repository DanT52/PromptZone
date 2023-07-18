"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import PromptCard from '@components/PromptCard'
import ShowMore from '@components/ShowMore'
import Image from 'next/image'





const MyProfile = () => {

  

  const { data: session } = useSession()

  const [posts, setPosts] = useState([])
  
  const [limit, setLimit] = useState(10)
  const [loading, setLoading] = useState(true)

  

  useEffect(() => {
    const fetchPosts = async () => {

        setLoading(true)
      const response = await fetch(`/api/prompt/getsaved?userId=${session?.user.id}&limit=${limit||10}`);
      const data = await response.json();
  
      setPosts(data);
      setLoading(false)
    };
    if(session?.user.id)fetchPosts();
  }, [session?.user.id, limit]);

  

  const PromptCardList = ({ data }) => {
  
    return (
      <div className=" prompt_layout">
        
        {data.map((post) =>(
          <PromptCard
            key={post._id}
            post={post}
  
          />
        ))}
      </div>
    )
  }

  return (
    <section className="w-full">
      <h1 className="head_text text-center">
        <span className="blue_gradient">
          Saved Quotes
        </span>
      </h1>
      <p className="mt-5 text-lg text-gray-600  text-center dark:text-slate-300">Welcome to your saved quotes.</p>

      <div className="mx-auto w-full max-w-xl flex justify-center items-center flex-col gap-2">
        
      
      <PromptCardList
      data={posts}

    />
    </div>

    {loading && (
      <div className=' w-full flex-center'>
      <Image 
        src="assets\icons\loader.svg"
        alt='loading'
        width={50}
        height={50}
        className='object-contain'
      />
    </div>
    )}

    {(posts.length === 0 && !loading) && (
         <h2 className='w-full flex-center text-black dark:text-white text-xl font-bold mt-10'> Opps, no saved quotes...</h2>
    )}

    <ShowMore 
      pageNumber={limit / 10}
      isNext={limit  > posts.length}
      setLimit={setLimit}
        />
    </section>
  )
}

export default MyProfile