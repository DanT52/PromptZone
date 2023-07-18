

import Feed from '@components/Feed'

const Home = () => {
    return (
        <section className="w-full flex-center flex-col">
          <h1 className="head_text text-center">
            <span className="orange_gradient text-center">Discover and Save Quotes</span>
          </h1>
          <p className="desc text-center dark:text-violet-300">
            Your Source for Famous and Unique Quotes
          </p>
          <Feed />
        </section>
      )
}

export default Home