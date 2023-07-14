"use client"





const ShowMore = ( { pageNumber, isNext, setLimit} ) => {
    

    const handleNavigation = () =>{
        const newLimit = (pageNumber +1) *10;
        setLimit(newLimit)
    }

  return (
    <div className="w-full flex-center gap-5 mb-10">
        {!isNext && (

            <button 
            onClick={handleNavigation} 
            className=" bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-gradient-to-r dark:from-blue-800 dark:to-purple-900 dark:hover:from-blue-700 dark:hover:to-purple-800 dark:text-white font-bold py-1 px-4 rounded">
            Show More ...
            </button>


          
        )}

    </div>
  )
}

export default ShowMore