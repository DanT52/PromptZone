import { useContext } from 'react';
import { DarkModeContext } from '../context/DarkModeContext';
import Image from 'next/image';

const DarkModeToggle = () => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);
  };

  return (
    <button onClick={toggleDarkMode} className='hover:bg-slate-300 dark:hover:bg-slate-900 rounded-full w-[40px] h-[40px] '>
      {darkMode ? (
        
        <Image src="/assets/icons/light.svg" alt="PromptZone logo"
            width={40}
            height={40}
            className='object-contain'/>
        ):(
          <Image src="/assets/icons/dark.svg" alt="PromptZone logo"
            width={40}
            height={40}
            className='object-contain'/>
          )}
    </button>
  );
};

export default DarkModeToggle;
