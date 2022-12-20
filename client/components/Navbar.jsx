import React, {useState, useEffect} from 'react'
import {useRouter} from "next/router"
import Link from "next/link"
import CustomButton from './CustiomButton'

const Navbar = () => {
    const router = useRouter()
    const [currentAccount, setCurrentAccount] = useState("0xd")
    const connectWallet = () => {}
  return (
    <div className='bg-white shadow-md flex items-center justify-between py-2 px-4'>
        <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px]  rounded-[100px]">
        <div className="w-[72px] h-full rounded-[20px]  flex justify-center items-center cursor-pointer">
          <img
            src="logo.png"
            alt="search"
            className="w-full h-full object-contain"
          />
        </div>
        <input
          type="text"
          placeholder="Search for campaigns"
          className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-black text-black bg-transparent outline-none"
        />
      </div>

      <div className="sm:flex hidden flex-row justify-end gap-4">
        <CustomButton
          btnType="button"
          title={currentAccount ? "Connected" : "Connect"}
          styles={currentAccount ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
          handleClick={() => {
            if (currentAccount) router.push("/");
            else connectWallet();
          }}
        />

        <Link href="/">
          <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
            <img
              src="logo.png"
              alt="user"
              className="w-[60%] h-[60%] object-contain"
            />
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Navbar