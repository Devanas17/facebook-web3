import Image from "next/image";

function StoryCard({ name, profile, src }) {
  return (
    <div className="relative h-14 w-14 md:h-18 md:w-18 cursor-pointer lg:h-40 lg:w-28 overflow-x p-1 transition duration-200 transform ease-in hover:scale-105 hover:animate-pulse ">
      <img
        src={profile}
        className="absolute opacity-0 lg:opacity-100 rounded-full z-50 top-10 w-10 h-10 "
        layout="fixed"
      />
      <img
        className="object-cover filter brightness-75 rounded-full lg:rounded-3xl w-full h-full"
        src={src}
        layout="fill"
      />
      <h5 className="hidden lg:block absolute bottom-4 text-white font-semibold text-xs p-1">
        {name}
      </h5>
    </div>
  );
}

export default StoryCard;