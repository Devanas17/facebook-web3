import React from 'react'
import {AiFillSetting} from "react-icons/ai"
import {MdFeedback} from "react-icons/md"
import {IoIosHelpCircle, IoMdMoon, IoArrowBackCircleSharp, IoLogOut} from "react-icons/io"
import WidgetRow from './WidgetRow'
import {ChevronDownIcon} from "@heroicons/react/outline"

const Widget = () => {
  return (
    <div className=' flex-[0.25] shadow-md hidden md:inline-flex flex-col mt-4 py-4 px-2 max-h-[450px]'>
      <WidgetRow Icon={AiFillSetting} title="Setting & Privacy" />
      <WidgetRow Icon={IoIosHelpCircle} title="Help & Support" />
      <WidgetRow Icon={IoArrowBackCircleSharp} title="Switch to Classic Facebook" />
      <WidgetRow Icon={MdFeedback} title="Send Feedback" />
      <WidgetRow Icon={IoLogOut} title="LogOut" />
      <WidgetRow Icon={ChevronDownIcon} title="See More" />
    </div>
  )
}

export default Widget