import Image from "next/image";
import { useContext, useState } from "react";
import { AppContext } from "../context/context";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/solid";
import { checkIfImage } from "../utils";
import FormField from "./FormField";
import Loader from "./Loader";

function InputBox() {
  const { createPost } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    caption: "",
    url: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  function sendPost(e) {
    e.preventDefault();
    checkIfImage(form.url, async (exists) => {
      if (exists) {
        setIsLoading(true);
        await createPost({ ...form });
        setIsLoading(false);
        window.location.reload()
      } else {
        alert("Provide valid image URL");
        setForm({ ...form, url: "" });
      }
    });
  }

  return (
    <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6 scrollbar-hide">
      <div className="flex items-center space-x-4 p-4">
        {isLoading && <Loader />}
        <form className="">
          <h1 className=" text-2xl font-semibold my-3">Upload Post</h1>
          <div className=" lg:flex space-y-4 lg:space-y-0 lg:space-x-2">
            <FormField
              labelName="Caption *"
              placeholder="Write a Caption"
              inputType="text"
              value={form.caption}
              handleChange={(e) => handleFormFieldChange("caption", e)}
            />
            <FormField
              labelName="Caption image *"
              placeholder="Place image URL of your caption"
              inputType="url"
              value={form.url}
              handleChange={(e) => handleFormFieldChange("url", e)}
            />
          </div>
          <button
            onClick={sendPost}
            className="bg-blue-500 text-white mt-3 px-4 py-2 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>

      <div className="flex items-center justify-evenly p-3 border-t mx-auto">
        <div className="inputIcon">
          <VideoCameraIcon className="h-7 text-red-500" />
          <p className="text-xs sm:text-sm xl:text-base">Live video</p>
        </div>

        <div className="inputIcon">
          <CameraIcon className="h-7 text-green-500" />
          <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
        </div>

        <div className="inputIcon">
          <EmojiHappyIcon className="h-7 text-yellow-300" />
          <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
        </div>
      </div>
    </div>
  );
}

export default InputBox;
