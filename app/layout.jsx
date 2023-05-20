import '@styles/globals.css'


export const metadata = {
    title: "PromptZone",
    description: 'Discover and find cool AI prompts'
}

const RootLayout = ( { children }) => {
  return (
    <html>
        <body>
            <div className='name'>
                <div className='gradient'/>
            </div>
            <main className='app'>

                {children}
            </main>
        </body>
    </html>
  )
}

export default RootLayout