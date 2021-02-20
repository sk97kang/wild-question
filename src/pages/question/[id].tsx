import { useRouter } from "next/dist/client/router";
import { Avatar } from "components/Avatar";
import { IoChatboxEllipsesOutline, IoSend } from "react-icons/io5";
import { Comment } from "components/Comment";
import { useEffect, useState } from "react";
import { dbService } from "firebase.confg";
import { useForm } from "react-hook-form";
import { Loading } from "components/Loading";
import { useUser } from "hooks/useUser";

interface IFormProps {
  comment: string;
}

const QuestionPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const [questionData, setQuestionData] = useState<QuestionType | null>(null);
  const [commentsData, setCommentsData] = useState<CommentType[]>([]);
  const [commentLoading, setCommentLoading] = useState(false);
  const [loading, setLoading] = useState(true);

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
        .orderBy("createdAt")
        .get();

      const Comments: CommentType[] = [];
      commentDocs.forEach(commentDoc => {
        Comments.push(commentDoc.data() as CommentType);
      });
      setCommentsData(Comments);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (router.query.id) {
      getData();
    }
  }, [router.query]);

  useEffect(() => {
    if (questionData) {
      questionData.isMine = questionData.writer.id === user?.id;
      setQuestionData({ ...questionData });
    }

    if (commentsData) {
      setCommentsData(
        commentsData.map(comment => {
          comment.isMine = comment.writer.id === user?.id;
          return comment;
        })
      );
    }
  }, [user, loading]);

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
          writer: user,
          createdAt: Date.now(),
          isMine: true,
        };
        await dbService.collection(`comments`).doc(id).set(newData);
        setCommentsData(prev => [...prev, newData]);
        setValue("comment", "");
      }
    } catch (error) {
      console.log(error);
    }
    setCommentLoading(false);
  };

  const deleteQuestion = async () => {
    if (!user) {
      alert("로그인 후 삭제가 가능합니다.");
    }
    if (questionData) {
      await dbService.doc(`questions/${questionData.id}`).delete();
      router.replace("/");
    }
  };

  const deleteComment = async (commentId: string) => {
    if (!user) {
      alert("로그인 후 삭제가 가능합니다.");
    }
    if (commentsData) {
      setCommentsData(comments =>
        comments.filter(comment => comment.id !== commentId)
      );
      await dbService.doc(`comments/${commentId}`).delete();
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!questionData) {
    return <Loading />;
  }
  console.log(questionData);

  return (
    <div>
      <div className="pb-20">
        <div className="mt-5 cursor-pointer" onClick={goHome}>
          &larr; Go Home
        </div>
        <div className="shadow-md p-6 rounded-md mt-5 mb-8">
          <div>
            <div className="flex justify-between items-start">
              <Avatar
                size={36}
                name={questionData.writer.name}
                image={questionData.writer.image}
              />
              {questionData.isMine && (
                <div className="flex border">
                  <button
                    className="p-2 text-sm focus:outline-none hover:bg-red-500 hover:text-white transition-all"
                    onClick={deleteQuestion}
                  >
                    <span>삭제하기</span>
                  </button>
                </div>
              )}
            </div>
            <div className="text-4xl font-medium mt-20 mb-20 text-center">
              "{questionData.title}"
            </div>
            <div className="flex justify-between items-end">
              <div className="flex items-center">
                <IoChatboxEllipsesOutline size={20} className="mr-1" />
                <span className="text-xs font-light opacity-70">
                  {commentsData.length}
                </span>
              </div>
              <div className="text-sm opacity-70">
                {new Date(questionData.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        {commentsData.map(comment => (
          <Comment
            key={comment.id}
            comment={comment}
            onDeleteClick={deleteComment}
          />
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
    </div>
  );
};

export default QuestionPage;
