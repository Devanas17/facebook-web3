import React, { useContext } from 'react'
import {AiFillSetting, AiOutlineLogout} from "react-icons/ai"
import {MdFeedback} from "react-icons/md"
import {IoIosHelpCircle, IoMdMoon, IoArrowBackCircleSharp, IoLogOut} from "react-icons/io"
import WidgetRow from './WidgetRow'
import {ChevronDownIcon} from "@heroicons/react/outline"
import { AppContext } from '../context/context'

const Widget = () => {

  const {logout} = useContext(AppContext)
  return (
    <div className=' flex-[0.25] shadow-md hidden md:inline-flex flex-col mt-4 py-4 px-5 h-[350px]'>
      <WidgetRow Icon={AiFillSetting} title="Setting & Privacy" />
      <WidgetRow Icon={IoIosHelpCircle} title="Help & Support" />
      <WidgetRow Icon={MdFeedback} title="Send Feedback" />
      <WidgetRow Icon={AiOutlineLogout} title="LogOut" logout={logout}/>
      <WidgetRow Icon={ChevronDownIcon} title="See More" />
    </div>
  )
}

export default Widget