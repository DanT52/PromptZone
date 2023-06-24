import '@styles/globals.css'

import Nav from '@components/Nav'
import Provider from '@components/Provider'
import { DarkModeProvider } from '@context/DarkModeContext'

export const metadata = {
    title: "PromptZone",
    description: 'Discover and find cool AI prompts'
}

const RootLayout = ( { children }) => {
    return (
      <DarkModeProvider>
        <html>
            <body>
                <Provider>
                <div className='main dark:bg-slate-950 '>
                    <div className=''/>
                </div>
                <main className='app '>
                    <Nav />
                    {children}
                </main>
                </Provider>
            </body>
        </html>
      </DarkModeProvider>
    )
  }

export default RootLayout