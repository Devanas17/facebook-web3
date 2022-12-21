import React from "react";
import Card from "./Card";

const Post = ({ title, isLoading, posts }) => {
  return (
    <div className=" my-4 flex flex-col  items-center justify-center">
      <h1 className="font-epilogue font-semibold text-2xl text-black text-left">
        {title} ({posts.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img
            src="loader.svg"
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}

        {!isLoading && posts.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campigns yet
          </p>
        )}
        <div className="grid grid-cols-1 gap-10 place-items-center	">
          {!isLoading &&
            posts.length > 0 &&
            posts.map((post) => <Card key={post.id} {...post} />)}
        </div>
      </div>
    </div>
  );
};

export default Post;
