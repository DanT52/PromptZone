import Link from "next/link"

const Form = ({type, post, setPost, submitting, handleSubmit}) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient"> {type} Post </span>
        
      </h1>
      <p className="desc text-left max-w-md dark:text-slate-300">
        {type} and share your AI prompt!
      </p>

      <form onSubmit={handleSubmit} className="mt-10 w-full max-w-2xl flex flex-col gap-6 glassmorphism">
        <label htmlFor="">
          <span className="font-satoshi font-semibold text-base text-gray-700 dark:text-slate-300">
            Your Prompt
          </span>
          <textarea 
            value={post.prompt}
            onChange={(e) => setPost({ ...post,
            prompt: e.target.value })}
            placeholder="Write (or paste) Your prompt here..."
            required
            className="resize-none form_textarea dark:bg-slate-800 dark:text-white"

          />
          <div className=" pt-10 font-satoshi font-semibold text-base text-gray-700 dark:text-slate-300">
            Description
          </div>
          <textarea 
            value={post.description}
            onChange={(e) => setPost({ ...post,
            description: e.target.value })}
            placeholder="Describe what your prompt does or include a sample output (optional)..."
            
            className="form_textarea dark:bg-slate-800 dark:text-white"

          />
        </label>
        <label htmlFor="">
          <span className="font-satoshi font-semibold text-base text-gray-700 dark:text-slate-300">
            Catagory { ' '}
            <span className="font-normal dark:text-slate-300"></span>
          </span>
          <input 
            value={post.tag}
            onChange={(e) => setPost({ ...post,
            tag: e.target.value })}
            placeholder="webdevelopment or creative-writing ect..."
            required
            className="form_input dark:bg-slate-800 dark:text-white"

          />
        </label>
        <label className="font-satoshi  text-sm text-gray-500 dark:text-blue-200 hover:opacity-90 cursor-pointer">
      <input
        type="checkbox"
        checked={post.showEmail}
        onChange={(e) => {
          setPost({ ...post,
          showEmail: e.target.checked })}
        }
        className="w-10 bg-red-100 border-red-300 text-red-500 focus:ring-red-200"
      />
       Show your email on the post
    </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm hover:text-red-700 dark:text-slate-300 dark:hover:text-red-600" >
          Cancel 
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white hover:bg-purple-500"
          >
            {submitting ? `${type}...` : type}

          </button>

        </div>
      </form>
    </section>
  )
}

export default Form