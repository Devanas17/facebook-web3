import InputBox from "./InputBox";
import PostSection from "./PostSection";
import Stories from "./Stories";

function Feed() {
  return (
    <div className="flex flex-col align-center flex-[0.6] h-screen pb-44 pt-6 mr-4 xl:mr-40 scrollbar-hide">
      <div className="mx-auto max-w-md md:max-w-2xl">
        <Stories />
        <InputBox />
        <PostSection />

      </div>
    </div>
  );
}

export default Feed;