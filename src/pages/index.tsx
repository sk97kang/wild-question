import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Question } from "components/Question";
import { dbService } from "firebase.confg";
import { Modal as CreateModal } from "components/Modal";
import { Loading } from "components/Loading";
import { useUser } from "hooks/useUser";
import { useQuestion } from "hooks/useQuestion";

interface IFormProps {
  text: string;
}

const HomePage = () => {
  const [questionLoading, setQuestionLoading] = useState(false);
  const { user } = useUser();
  const { questions, loading, setQuestions } = useQuestion();
  const questionsRef = dbService.collection("questions");

  const { register, getValues, setValue, handleSubmit } = useForm<IFormProps>();

  const [activedAddModal, setActivedAddModal] = useState(false);

  const onAddQuestionClick = () => {
    if (!user) {
      alert("로그인을 먼저 진행해주세요!");
      return;
    }

    setActivedAddModal(true);
  };

  const onSubmit = async () => {
    if (!user) {
      alert("로그인을 먼저 진행해주세요!");
      return;
    }
    const { text } = getValues();
    try {
      if (!questionLoading) {
        setQuestionLoading(true);
        const newId = await questionsRef.doc().id;
        const newData = {
          id: newId,
          title: text,
          writer: user,
          createdAt: Date.now(),
        };
        await questionsRef.doc(newId).set(newData);
        setQuestions(prev => [newData, ...prev]);
        setValue("text", "");
      }
    } catch (error) {
      console.log(error);
    }
    setQuestionLoading(false);
    setActivedAddModal(false);
  };

  const onCancelClick = () => {
    setActivedAddModal(false);
  };

  const router = useRouter();

  const onQuestionClick = (id: string) => {
    router.push(`/question/${id}`);
  };

  return (
    <div>
      <div className="mt-10">
        <div className="mb-10 flex flex-col items-center md:flex-row md:justify-between">
          <h1 className="text-3xl font-medium mb-5 md:mb-0 ">우리들의 엉궁</h1>
          <button
            className="py-2 px-4 rounded-sm text-white bg-indigo-500 hover:bg-indigo-700 transition focus:outline-none"
            onClick={onAddQuestionClick}
          >
            🙋‍♂️ 질문있어요 🙋‍♀️
          </button>
        </div>
        <div>
          {loading ? (
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
    </div>
  );
};

export default HomePage;
