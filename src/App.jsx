/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [isNum, setIsNum] = useState(false);
  const [isChar, setIsChar] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(isNum) str+="0123456789";
    if(isChar) str+="!@#$%^&*()_+-=[]{}~`|";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);

  },[length, isNum, isChar, password]);

  const copyPasswordToClip = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  },[password])

  useEffect(()=>{
    passwordGenerator()
  }, [length, isNum, isChar]);

  return (
    <>
    <div className='w-full h-screen bg-gradient-to-b from-gray-900 to-gray-600'>
      <div className='w-full bg-black text-white text-4xl flex justify-center py-4'>Password Generator</div>
      <div className='bg-yellow-300 max-w-2xl mx-auto mt-8 rounded-2xl py-4 px-6'>
        <div className=" flex flex-row ">
          <input type="text" value={password} readOnly placeholder='password'
          className='w-full px-4 py-3 rounded-l-lg'
          ref={passwordRef}
          />
          <button className=' bg-orange-600  px-4 py-3 rounded-r-lg'
          onClick={copyPasswordToClip}
          >copy</button>
        </div>
        <div className="flex  place-content-between mt-4 px-6">
          <div className='flex ga p-x-2'>
            
          <input type="range" min={5} max={100} value={length} 
          className='cursor-pointer'
          onChange={(e) => {setLength(e.target.value)}}
          />
          <label htmlFor="">length: {length}</label>
          </div>

          <div>
            <input type="checkbox" 
            defaultChecked={isNum}
            id='numberInput'
            onChange={()=>{
              setIsNum((prev)=>!prev);
            }}
            />
            <label className='px-1'>Numbers</label>
          </div>

          <div>
            <input type="checkbox" 
            defaultChecked={isChar}
            id='charInput'
            onChange={()=>{
              setIsChar((prev)=>!prev);
            }}
            />
            <label className='px-1'>Characters</label>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
