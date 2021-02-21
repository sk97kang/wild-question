import { useRouter } from "next/dist/client/router";
import { Avatar } from "components/Avatar";
import { IoChatboxEllipsesOutline, IoSend } from "react-icons/io5";
import { Comment } from "components/Comment";
import { useCallback, useEffect } from "react";
import { dbService } from "firebase.confg";
import { useForm } from "react-hook-form";
import { Loading } from "components/Loading";
import { useUser } from "hooks/useUser";
import { useQuestion } from "hooks/useQuestion";
import { Layout } from "components/Layout";
import { GetServerSideProps } from "next";

interface IQuestionPageProps {
  question: QuestionType;
}

interface IFormProps {
  comment: string;
}

const QuestionPage: React.FC<IQuestionPageProps> = ({ question }) => {
  const router = useRouter();
  const { user } = useUser();
  const {
    comments,
    addComment,
    deleteQuestion,
    getComments,
    setComments,
    commentsInitLoading,
    commentsUpdateLoading,
  } = useQuestion();

  const goHome = useCallback(() => {
    router.push("/");
  }, [router]);

  useEffect(() => {
    if (question) {
      getComments(question.id);
    }
  }, [question]);

  const { register, handleSubmit, getValues, setValue } = useForm<IFormProps>();

  const onSubmit = useCallback(async () => {
    if (!user) {
      alert("로그인 후 댓글을 작성할 수 있습니다.");
      return;
    }
    try {
      if (commentsUpdateLoading || !question) {
        return;
      }
      const { comment } = getValues();
      const newComment: CommentType = {
        id: "",
        comment,
        questionId: question.id,
        writer: user,
        createdAt: Date.now(),
      };
      setValue("comment", "");
      addComment(newComment);
    } catch (error) {
      console.log(error);
    }
  }, [user, commentsUpdateLoading, question]);

  const onDeleteQuestionClick = useCallback(async () => {
    if (!user) {
      alert("로그인 후 삭제가 가능합니다.");
    }
    if (question) {
      await deleteQuestion(question.id);
      router.replace("/");
    }
  }, [dbService, user, question, router]);

  const deleteComment = useCallback(
    async (commentId: string) => {
      if (!user) {
        alert("로그인 후 삭제가 가능합니다.");
      }
      setComments(comments =>
        comments.filter(comment => comment.id !== commentId)
      );
      try {
        await dbService.doc(`comments/${commentId}`).delete();
      } catch (error) {
        console.log(error);
      }
    },
    [dbService, user]
  );

  return (
    <Layout title={question.title}>
      <div className="pb-20">
        <div className="mt-5 cursor-pointer" onClick={goHome}>
          &larr; Go Home
        </div>
        <div className="shadow-md p-6 rounded-md mt-5 mb-8">
          <div>
            <div className="flex justify-between items-start">
              <Avatar
                size={36}
                name={question.writer.name}
                image={question.writer.image}
              />
              {user?.id === question.writer.id && (
                <div className="flex border">
                  <button
                    className="p-2 text-sm focus:outline-none hover:bg-red-500 hover:text-white transition-all"
                    onClick={onDeleteQuestionClick}
                  >
                    <span>삭제하기</span>
                  </button>
                </div>
              )}
            </div>
            <div className="text-4xl font-medium mt-20 mb-20 text-center">
              "{question.title}"
            </div>
            <div className="flex justify-between items-end">
              <div className="flex items-center">
                <IoChatboxEllipsesOutline size={20} className="mr-1" />
                <span className="text-xs font-light opacity-70">
                  {commentsInitLoading ? "?" : comments.length}
                </span>
              </div>
              <div className="text-sm opacity-70">
                {new Date(question.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        {commentsInitLoading ? (
          <Loading />
        ) : (
          comments.map(comment => (
            <Comment
              key={comment.id}
              comment={comment}
              canDelete={comment.writer.id === user?.id}
              onDeleteClick={deleteComment}
            />
          ))
        )}

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

export const getServerSideProps: GetServerSideProps = async context => {
  const id = context.params?.id;
  const doc = await dbService
    .collection("questions")
    .doc(id as string)
    .get();
  const question = doc.data();
  return { props: { question } };
};

export default QuestionPage;
