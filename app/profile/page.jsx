"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import ShowMore from '@components/ShowMore'
import PromptCard from '@components/PromptCard'
import Image from 'next/image'




const MyProfile = () => {

  const router = useRouter()

  const { data: session } = useSession()

  const [posts, setPosts] = useState([])

  const [limit, setLimit] = useState(10)

  const [shownPosts, setShownPosts] = useState([])

  const [loading, setLoading] = useState(true)

  

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
  
      setPosts(data);
      setShownPosts(data.slice(0,limit))
      setLoading(false)

    };
    if(session?.user.id)fetchPosts();
  }, [session?.user.id]);

  useEffect(() => {
    setShownPosts(posts.slice(0,limit))
  }, [limit])


  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)

  }

  const handleDelete = async(post) =>{
    const hasConformed = confirm("Are you sure you want to delete this prompt?")

    if(hasConformed){
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE'
        })

        const filteredPosts = posts.filter((p) => p._id !==post._id)

        setPosts(filteredPosts)

      } catch (error) {
        console.log(error)
        
      }
    }

  }

  return (
    <section className="w-full">
      <h1 className="head_text text-center">
        <span className="blue_gradient">
          Your Profile
        </span>
      </h1>
      <p className="mt-5 text-lg text-gray-600  text-center dark:text-slate-300">The quotes you have posted so far...</p>

      <div className="mt-10  flex justify-center items-center flex-col ">

        <div className='prompt_layout'>
        {shownPosts.map((post) =>(
        <PromptCard
          key={post._id}
          post={post}
          handleEdit={() => handleEdit && handleEdit (post)}
          handleDelete={() => handleDelete && handleDelete(post)}

        />
      ))}

        </div>
      
      
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

    
    <ShowMore 
      pageNumber={limit / 10}
      isNext={limit  > shownPosts.length}
      setLimit={setLimit}
        />
    </section>
  )
}

export default MyProfile