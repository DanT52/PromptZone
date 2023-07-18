"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";
import Catagories from "./Catagories";
import Image from "next/image";
import ShowMore from "./ShowMore";

const PromptCardList = ({ data, handleTagClick, handleAuthorClick }) => {
  
  return (
    <div className="mt-5 prompt_layout">
      
      {data.map((post) =>(
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          handleAuthorClick={handleAuthorClick}

        />
      ))}
    </div>
  )
}

const Feed = () => {
  
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(false)

  const [limit, setLimit] = useState(10)

  const [searchText, setSearchText] = useState('')
  const [searchCat, setSearchCat] = useState('')
  const [sortSaved, setSortSaved] = useState(false)

  const [catVal, setCatVal] = useState('All Categories')





  const fetchPosts = async () => {
    setLoading(true)

    try {
      const response = await fetch(`/api/prompt?category=${searchCat||""}&text=${searchText||""}&limit=${limit||10}&mostSaved=${sortSaved||false}`);
      const data = await response.json();

      setAllPosts(data);
      
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
    
  };

  useEffect(() => {
    fetchPosts();
  }, [searchText, searchCat, limit, sortSaved]);



  const handleSearchChange = (e) => {
    
    setSearchText(e.target.value)
    setLimit(10)

  }

  const handleTagClick = (tagName) => {
    setSearchCat(tagName)
    setCatVal(tagName)
    setSearchText("")
    setLimit(10)
  }

  const handleAuthorClick = (author) => {
    setSearchText(author)
    setSearchCat("")
    setCatVal("All Categories")
    setLimit(10)
    
  }

  const setCatagory = (value) => {
    setLimit(10)
    if (value ==="All Categories"){
      setSearchCat("")
    }else{
      setSearchCat(value)
    }
  }
  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  const handleSortChange = () => {
    const temp = !sortSaved
    setSortSaved(temp)
  }

  return (
    <section className="feed">
      <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row z-10">
        <input type="text"
               placeholder="Search..."
               value={searchText}
               onChange={handleSearchChange}
      
               className="search_input peer placeholder-slate-800 dark:placeholder-slate-200 bg-white dark:bg-slate-800 dark:text-white" 
              />
        <Catagories isHome={true}  value={catVal} onChange={(value) => setCatagory(value)}  />
      </form>

<div className="flex flex-row">
<input
        type="checkbox"
        onChange={handleSortChange}
        
        
        
        
        className="w-4 bg-red-100 border-red-300 text-red-500 focus:ring-red-200"
      />
       <h2 className='ml-3 text-slate-600 dark:text-white text-sm '> Sort by Most Saved</h2>
</div>
      

      {
  loading && limit === 10 ? (
    <div className='mt-16 w-full flex-center'>
      <Image 
        src="assets\icons\loader.svg"
        alt='loading'
        width={50}
        height={50}
        className='object-contain'
      />
    </div>
  ) : allPosts.length < 1 ? (
    <div>
       <h2 className='text-black dark:text-white text-xl font-bold mt-10'> Opps, no results...</h2>
    </div>
  ) : (
    <PromptCardList
      data={allPosts}
      handleTagClick={handleTagClick}
      handleAuthorClick={handleAuthorClick}
    />
  )
}


    {!loading && (
      <ShowMore 
      pageNumber={limit / 10}
      isNext={limit  > allPosts.length}
      setLimit={setLimit}
        />

    )}
    {(loading && limit > 10) && (
      <div className='w-full flex-center'>
      <Image 
        src="assets\icons\loader.svg"
        alt='loading'
        width={30}
        height={30}
        className='object-contain'
      />
    </div>


    )}
    
    

      
        
      
      
    </section>

  )
}

export default Feed
