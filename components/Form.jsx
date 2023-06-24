import Link from "next/link"

const Form = ({type, post, setPost, submitting, handleSubmit}) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient"> {type} Post </span>
        
      </h1>
      <p className="desc text-left max-w-md dark:text-slate-300">
        {type} and share amazing prompts! AI POWER!
      </p>

      <form onSubmit={handleSubmit} className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
        <label htmlFor="">
          <span className="font-satoshi font-semibold text-base text-gray-700 dark:text-slate-300">
            Your Prompt
          </span>
          <textarea 
            value={post.prompt}
            onChange={(e) => setPost({ ...post,
            prompt: e.target.value })}
            placeholder="Write Your prompt..."
            required
            className="form_textarea dark:bg-slate-800 dark:text-white"

          />
        </label>
        <label htmlFor="">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag { ' '}
            <span className="font-normal dark:text-slate-300">(#ideas, #fun, #images)</span>
          </span>
          <input 
            value={post.tag}
            onChange={(e) => setPost({ ...post,
            tag: e.target.value })}
            placeholder="#tags"
            required
            className="form_input dark:bg-slate-800 dark:text-white"

          />
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