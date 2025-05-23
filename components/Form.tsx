import usePosts from "@/hooks/usePosts";
import axios from "axios";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import Button from "./Button";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import Avatar from "./avatar";

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}
const Form = ({ placeholder, isComment, postId }: FormProps) => {
  const [body, setBody] = useState("");
  console.log("body====>", body);

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();
  const [isLoading, setIsLoading] = useState(false);
  const onPostSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.post("/api/posts", { body });
      setBody("");
      toast.success("New tweet created!");
      mutatePosts();
    } catch (error) {
      toast.error("Someting went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [body, mutatePosts]);
  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      {!currentUser ? (
        <div className="flex justify-center items-center h-20">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white"></div>
        </div>
      ) : currentUser ? (
        <div className="flex flex-row gap-4">
          <div>
            <Avatar userId={currentUser?.id} />
          </div>
          <div className="w-full">
            <textarea
              disabled={isLoading}
              className="disabled:opacity-80
              peer
              resize-none
              mt-3
              w-full
              bg-black
              outline-none
              text-[20px]
              placeholder-neutral-500
              text-white
              "
              placeholder="What's happening?"
            ></textarea>
            <hr className="opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition" />
            <div className="mt-4 flex flex-row justify-end">
              <Button disabled={isLoading} label="Tweet"  onClick={onPostSubmit}/>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-5">
          <h1 className="text-white text-2xl text-center mb-4 font-bold">
            Welcome to Twitter
          </h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Login"  onClick={loginModal.onOpen}/>
            <Button label="Register" secondary  onClick={registerModal.onOpen}/>
          </div>
        </div>
      )}
    </div>
  );
};
export default Form;
