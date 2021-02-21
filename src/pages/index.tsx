import { useRouter } from "next/dist/client/router";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Question } from "components/Question";
import { Modal as CreateModal } from "components/Modal";
import { Loading } from "components/Loading";
import { useUser } from "hooks/useUser";
import { useQuestion } from "hooks/useQuestion";
import { Layout } from "components/Layout";
import { GetStaticProps } from "next";

interface IFormProps {
  text: string;
}

const HomePage = () => {
  const router = useRouter();
  const { user } = useUser();
  const {
    questions,
    questionInitLoading,
    questionUpdateLoading,
    getQuestions,
    addQuestion,
  } = useQuestion();
  const [activedAddModal, setActivedAddModal] = useState(false);
  const { register, getValues, setValue, handleSubmit } = useForm<IFormProps>();

  useEffect(() => {
    if (questions.length === 0) {
      getQuestions();
    }
  }, []);

  const onAddQuestionClick = useCallback(() => {
    if (!user) {
      alert("로그인을 먼저 진행해주세요!");
      return;
    }
    setActivedAddModal(true);
  }, [user]);

  const onSubmit = useCallback(async () => {
    if (!user) {
      alert("로그인을 먼저 진행해주세요!");
      return;
    }
    if (questionUpdateLoading) {
      return;
    }
    const { text } = getValues();
    const newQuestion: QuestionType = {
      id: "",
      title: text,
      writer: user,
      createdAt: Date.now(),
    };
    await addQuestion(newQuestion);
    setValue("text", "");
    setActivedAddModal(false);
  }, [user, questionInitLoading]);

  const onCancelClick = useCallback(() => {
    setActivedAddModal(false);
  }, []);

  const onQuestionClick = useCallback((id: string) => {
    router.push(`/question/${id}`);
  }, []);

  return (
    <Layout title="Home">
      <div className="mt-10">
        <div className="mb-10 flex flex-col items-center md:flex-row md:justify-between">
          <h1 className="text-3xl font-medium mb-5 md:mb-0 ">
            우리들의 엉궁해
          </h1>
          <button
            className="py-2 px-4 rounded-sm text-white bg-indigo-500 hover:bg-indigo-700 transition focus:outline-none"
            onClick={onAddQuestionClick}
          >
            🙋‍♂️ 질문있어요 🙋‍♀️
          </button>
        </div>
        <div>
          {questionInitLoading ? (
            <Loading />
          ) : (
            questions.map(question => (
              <Question
                key={question.id}
                question={question}
                onCardClick={onQuestionClick}
              />
            ))
          )}
        </div>
      </div>

      <CreateModal
        isVisible={activedAddModal}
        title={"어떤 생각을 하셨나요?"}
        buttonTitle={"질문하기"}
        register={register}
        onSubmit={handleSubmit(onSubmit)}
        onCancelClick={onCancelClick}
      />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};

export default HomePage;
