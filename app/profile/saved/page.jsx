"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import PromptCard from '@components/PromptCard'
import ShowMore from '@components/ShowMore'





const MyProfile = () => {

  const router = useRouter()

  const { data: session } = useSession()

  const [posts, setPosts] = useState([])
  
  const [limit, setLimit] = useState(10)

  

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/prompt/getsaved?userId=${session?.user.id}&limit=${limit||10}`);
      const data = await response.json();
  
      setPosts(data);
      console.log(limit)
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
    <ShowMore 
      pageNumber={limit / 10}
      isNext={limit  > posts.length}
      setLimit={setLimit}
        />
    </section>
  )
}

export default MyProfile