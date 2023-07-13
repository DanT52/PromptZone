import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'


const cats = ['Inspirational', 'Humor', 'Love', 'Life Lessons', 'Creativity', 'Philosophy'];


export default function Catagories({ value, onChange, isHome = false }) {

  const categories = isHome ? ['All Categories', ...cats] : cats;
    
  const [selected, setSelected] = useState(categories[0])

  useEffect(() => {
    setSelected(value|| categories[0]);
  }, [value]);

  

  

  const handleChange = (category) => {
    setSelected(category);
    if (onChange) {
      onChange(category);
    }
  };

  return (
    <div className="">
      <Listbox value={selected} onChange={handleChange}>
        <div className="relative mt-1 w-[175px] ">
          <Listbox.Button className="dark:bg-slate-800 dark:text-white relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selected}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
             
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className=" dark:bg-slate-800 dark:text-white absolute mt-1 max-h-70 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {categories.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-purple-100 text-purple-900' : 'text-gray-900 dark:text-white'
                    }`
                  }
                  value={person}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {person}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                         
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
