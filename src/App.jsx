import React, { useCallback, useState, useEffect, useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/Card'

function App() {

  const [length, setLength] = useState(8)
  const [charAllowed, setCharAllowed] = useState(false)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [password, setPassword] = useState('')

  const passwordRef = useRef(null);

  const generatePassword = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"


if (numberAllowed) {
    str += '0123456789';
}

if (charAllowed) {
    
    str += '!@#$%^&/'
}

    for(let i = 0; i < length; i++)
    {
        let index = Math.floor(Math.random() * str.length)
        pass += str[index]
    }

    setPassword(pass)
  }, [length, numberAllowed, charAllowed])

    useEffect(()=>{
        generatePassword()
    }, [length, charAllowed, numberAllowed])


    const copyPassword = ()=>{
        window.navigator.clipboard.writeText(password)
        passwordRef.current.select()
    }
  
  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-800 pt-12">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            
            {/* Heading */}
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Password Generator</h1>

            {/* Password Input and Generate Button */}
            <div className="relative mb-6">
                <input 
                    type="text" 
                    placeholder="Password" 
                    className="w-full py-3 px-4 pr-20 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={password}
                    ref={passwordRef}
                />
                <button 
                    className="absolute right-0 top-0 bottom-0 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r-md"
                   onClick={copyPassword}
                >
                    Copy
                </button>
            </div>

            {/* Options Section: Checkboxes and Range Slider */}
            <div className="bg-gray-100 p-4 rounded-lg">
                    {/* Checkboxes */}
                    <div className="flex items-center space-x-4 justify-around">
                        <label className="flex items-center">
                            <input
                             type="checkbox" 
                             defaultChecked={numberAllowed}
                             onChange={()=>{
                                setNumberAllowed((prev)=>!prev)
                             }}
                             className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded" />
                            <span className="ml-2 text-gray-700">Numbers</span>
                        </label>
                        <label className="flex items-center">
                            <input type="checkbox" 
                            defaultChecked={charAllowed}
                             onChange={()=>{
                                setCharAllowed((prev)=>!prev)
                             }}
                            className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded" />
                         
                            <span className="ml-2 text-gray-700">Characters</span>
                        </label>
                    </div>

                   

                 {/* Range Slider */}
                 <div className="flex items-center space-x-2 px-5">
                 <label htmlFor="length">Length: </label>
                        <span className="text-gray-700">8</span>
                        <input 
                            type="range" 
                            min="8" 
                            max="16" 
                            defaultValue="12"
                            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e)=>{setLength(e.target.value)}}
                        />
                        <span className="text-gray-700">16</span>
                    </div>
            </div>
        </div>
    </div>
);
}

export default App
