import React, { useState, useContext, useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { AppContext } from "../context/context";
import Loader from "../components/Loader";

const Card = ({ owner, title, image, likes, pId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { like } = useContext(AppContext);
  const handleLike = async () => {
    setIsLoading(true);
    await like(pId + 1);
    setIsLoading(false);
    window.location.reload()
  };

  const likesInNumber = likes.toNumber();

  return (
    <>
      {isLoading && <Loader />}
      <div className=" max-w-[350px] h-[360px] rounded-[15px] bg-white cursor-pointer border border-gray-200">
        <img
          src={image}
          alt="fund"
          className="w-[100%] h-[70%] object-contain	 "
        />

        <div className="flex flex-col p-2 mt-2 border-t">
          <div className="flex  justify-between ">
            <h3 className="font-semibold text-[16px] text-gray-800 text-left leading-[26px] truncate mr-5">
              {title}
            </h3>
            <div className="flex flex-col items-center justify-center ">
              <AiFillHeart
                className="h-6 w-6 cursor-pointer text-red-800"
                onClick={() => handleLike()}
              />
              <span>{likesInNumber}</span>
            </div>
          </div>

          <div className="flex items-center mt-2">
            <p className="text-[12px] text-gray-500 truncate px-2">
              by <span className="text-gray-700 font-semibold">{owner}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
