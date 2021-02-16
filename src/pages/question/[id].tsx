import { useRouter } from "next/dist/client/router";
import { Avatar } from "components/Avatar";
import { Layout } from "components/Layout";
import {
  IoHeartOutline,
  IoChatboxEllipsesOutline,
  IoSend,
} from "react-icons/io5";
import { Comment } from "components/Comment";

const QuestionPage = () => {
  const router = useRouter();

  const goHome = () => {
    router.push("/");
  };
  console.log(process.env.HI);
  return (
    <Layout>
      <div className="pb-20">
        <div className="mt-5 cursor-pointer" onClick={goHome}>
          &larr; Go Home
        </div>
        <div className="shadow-md p-6 rounded-md mt-5 mb-8">
          <div>
            <div className="flex justify-between items-center">
              <Avatar size={10} />
              <div className="text-sm opacity-70">2021-02-13</div>
            </div>
            <div className="text-4xl font-medium mt-20 mb-20 text-center">
              "짜장면엔 국물이 왜 없을까요?"
            </div>
            <div className="flex">
              <div className="flex items-center mr-4">
                <IoHeartOutline size={20} className="mr-1" />
                <span className="text-xs font-light opacity-70">50</span>
              </div>
              <div className="flex items-center">
                <IoChatboxEllipsesOutline size={20} className="mr-1" />
                <span className="text-xs font-light opacity-70">50</span>
              </div>
            </div>
          </div>
        </div>

        {new Array(10).fill(0).map(() => (
          <Comment />
        ))}

        <div className="w-full fixed bottom-0 left-0 pt-2 pb-8 z-10 px-4 md:px-0 bg-white">
          <div className="shadow-md rounded-md p-4 flex items-center w-full max-w-screen-md mx-auto left-0">
            <input
              type="text"
              placeholder="댓글을 입력해보세요."
              className="w-full border-b focus:outline-none mr-4"
            />
            <button className="focus:outline-none">
              <IoSend />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default QuestionPage;
