import Feed from '@components/Feed'

const Home = () => {
    return (
        <section className="w-full flex-center
        flex-col">
            <h1 className="head_text text-center">
                Discover & Share
                <br className="max-md:hidden"/>
                <span className="orange_gradient text-center"> AI-Powered Prompts</span>
            </h1>
            <p className="desc text-center">
            Welcome to Prompt Zone, your gateway to an endless realm of captivating AI prompts, where inspiration meets imagination and creativity thrives!
            </p>
            <Feed />
        </section>
    )
}

export default Home