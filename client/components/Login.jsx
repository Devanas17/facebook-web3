import React, {useContext} from 'react'
import {AppContext} from "../context/context"

const Login = () => {
    const {connectWallet} = useContext(AppContext)
  return (
    <div className='flex items-center justify-center w-full h-screen'>
        <button className="bg-blue-600 text-white w-44 h-10 cursor-pointer rounded-md font-semibold" onClick={() => connectWallet()}>Login with Metamask</button>
    </div>
  )
}

export default Login