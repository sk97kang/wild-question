import { useRouter } from "next/dist/client/router";
import { Avatar } from "components/Avatar";
import { Layout } from "components/Layout";
import { IoChatboxEllipsesOutline, IoSend } from "react-icons/io5";
import { Comment } from "components/Comment";
import { useEffect, useState } from "react";
import { dbService } from "firebase.confg";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { userState } from "stores/user";

interface IFormProps {
  comment: string;
}

const QuestionPage = () => {
  const router = useRouter();
  const user = useRecoilValue(userState);
  const [questionData, setQuestionData] = useState<QuestionType | null>(null);
  const [commentData, setCommentData] = useState<CommentType[]>([]);
  const [commentLoading, setCommentLoading] = useState(false);

  const goHome = () => {
    router.push("/");
  };

  const getData = async () => {
    try {
      const questionDoc = await dbService
        .collection("questions")
        .doc(router.query.id as string)
        .get();
      setQuestionData(questionDoc.data() as QuestionType);

      const commentDocs = await dbService
        .collection("comments")
        .where("questionId", "==", router.query.id as string)
        .get();
      const newComments: CommentType[] = [];
      commentDocs.forEach(commentDoc =>
        newComments.push(commentDoc.data() as CommentType)
      );
      setCommentData(newComments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (router.query.id) {
      getData();
    }
  }, [router.query]);

  const { register, handleSubmit, getValues, setValue } = useForm<IFormProps>();

  const onSubmit = async () => {
    if (!user) {
      alert("로그인 후 댓글을 작성할 수 있습니다.");
      return;
    }
    try {
      if (!commentLoading) {
        setCommentLoading(true);
        const { comment } = getValues();
        const id = await dbService.collection(`comments`).doc().id;
        const newData: CommentType = {
          id,
          questionId: router.query.id as string,
          comment,
          writer: {
            id: user.uid,
            image: user.photoURL,
            name: user.displayName,
          },
          createdAt: Date.now(),
        };
        await dbService.collection(`comments`).doc(id).set(newData);
        setCommentData(prev => [...prev, newData]);
        setValue("comment", "");
      }
    } catch (error) {
      console.log(error);
    }
    setCommentLoading(false);
  };

  if (!questionData) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="pb-20">
        <div className="mt-5 cursor-pointer" onClick={goHome}>
          &larr; Go Home
        </div>
        <div className="shadow-md p-6 rounded-md mt-5 mb-8">
          <div>
            <div className="flex justify-between items-center">
              <Avatar
                size={10}
                name={questionData.writer.name}
                image={questionData.writer.image}
              />
              <div className="text-sm opacity-70">
                {new Date(questionData.createdAt).toLocaleDateString()}
              </div>
            </div>
            <div className="text-4xl font-medium mt-20 mb-20 text-center">
              "{questionData.title}"
            </div>
            <div className="flex">
              {/* <div className="flex items-center mr-4">
                <IoHeartOutline size={20} className="mr-1" />
                <span className="text-xs font-light opacity-70">50</span>
              </div> */}
              <div className="flex items-center">
                <IoChatboxEllipsesOutline size={20} className="mr-1" />
                <span className="text-xs font-light opacity-70">
                  {commentData.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {commentData.map(comment => (
          <Comment key={comment.id} comment={comment} />
        ))}

        <div className="w-full fixed bottom-0 left-0 pt-2 pb-8 z-10 px-4 md:px-0 bg-white">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="shadow-md rounded-md p-4 flex items-center w-full max-w-screen-md mx-auto left-0"
          >
            <input
              ref={register({ required: "This is required" })}
              name="comment"
              type="text"
              placeholder="댓글을 입력해보세요."
              className="w-full border-b focus:outline-none mr-4"
            />
            <button className="focus:outline-none">
              <IoSend />
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default QuestionPage;
