"use client"

import Link from 'next/link'
import Image from 'next/image'
import {useState, useEffect} from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import DarkModeToggle from './DarkModeToggle'
const Nav = () => {
    const {data: session} = useSession()
    const [providers, setProviders ] = useState(null);

    const [toggleDropdown, setToggleDropDown] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const setUpProviders = async () =>{
            const response = await getProviders()

            setProviders(response)
        }
        setUpProviders()
    }, [])

    
    
  return (
    <nav className="flex-between w-full mb-16 pt-3">
        <Link href="/" className=' flex gap-2 flex-center'  >
            <Image src="/assets/images/logo.svg" alt="PromptZone logo"
            width={30}
            height={30}
            className='object-contain'/>

            <p className='logo_text dark:text-purple-300'>Quote<span className='text-purple-500 dark:text-blue-400'>Zone</span></p>
        </Link>

        {/* Desktop navigation*/}

        <div className='sm:flex hidden gap-4'>
          
        <DarkModeToggle/>

            {session?.user ? (
                <div className='flex gap-3 md:gap-5'>
                    <Link href="/create-prompt" className='black_btn dark:outline outline-1'>
                        New Quote
                    </Link>
                    <Link href="/profile/saved" className='black_btn dark:outline outline-1'>
                        Saved Quotes
                    </Link>

                    <button type='button' onClick={signOut} className='outline_btn dark:text-white dark:border-white'>
                        Sign Out
                    </button>
                    <Link href="/profile">
                        <Image src={session?.user.image}
                        width={37}
                        height={37}
                        className='rounded-full'
                        alt='profile' />
                    </Link>
                </div>
            ): (
                <>
                {providers &&
                Object.values(providers).map((provider)=> (
                    <button
                        type='button'
                        key={provider.name}
                        onClick={() => signIn(provider.id)}
                        className='black_btn dark:outline outline-1'
                    >
                        Sign In
                    </button>
                ))}
                </>
            )}
            

        </div>

        {/* Mobile Navigation */}
        <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image
              src="/assets/icons/menu.svg"
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDropDown(!toggleDropdown)}
            />
            

            {toggleDropdown && (
              <div className='dropdown dark:bg-slate-800'>
                
                <Link
                  href='/profile'
                  className='dropdown_link dark:text-slate-300 dark:hover:text-white '
                  onClick={() => setToggleDropDown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/profile/saved'
                  className='dropdown_link dark:text-slate-300 dark:hover:text-white '
                  onClick={() => setToggleDropDown(false)}
                >
                  Saved Quotes
                </Link>
                
                <Link
                  href='/create-prompt'
                  className='dropdown_link dark:text-slate-300 dark:hover:text-white'
                  onClick={() => setToggleDropDown(false)}
                >
                  New Prompt
                </Link>
                <DarkModeToggle/>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropDown(false);
                    signOut();
                  }}
                  className=' w-full black_btn'
                >
                  Sign Out

                            </button>

                        </div>
                    )}

                </div>
            ): (
                <>
                {providers &&
                Object.values(providers).map((provider)=> (
                    <button
                        type='button'
                        key={provider.name}
                        onClick={() => signIn(provider.id)}
                        className='black_btn'
                    >
                        Sign In
                    </button>
                ))}
                </>
            )
            }
            
        </div>
    </nav>
  )
}

export default Nav