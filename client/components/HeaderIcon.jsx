function HeaderIcon({ Icon, active }) {
    return (
      <div className="flex items-center cursor-pointer sm:h-14 md:px-10 md:hover:bg-gray-100 rounded-xl active:border-b-2 active:border-blue-500 group">
        <Icon
          className={`h-5 text-center sm:h-7 mx-auto text-gray-600 group-hover:text-blue-500 ${
            active && "text-blue-500"
          }`}
        />
      </div>
    );
  }
  
  export default HeaderIcon;