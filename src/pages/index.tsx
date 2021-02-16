import { useState } from "react";
import { useForm } from "react-hook-form";
import { Layout } from "../components/Layout";
import { Question } from "../components/Question";

const DefaultData = [
  {
    title: "짜장면은 왜 국물이 없을까요?",
    writer: "Kan",
    createdAt: "2021-02-16",
  },
  {
    title: "짜장면은 왜 국물이 없을까요?",
    writer: "Kan",
    createdAt: "2021-02-16",
  },
  {
    title: "짜장면은 왜 국물이 없을까요?",
    writer: "Kan",
    createdAt: "2021-02-16",
  },
  {
    title: "짜장면은 왜 국물이 없을까요?",
    writer: "Kan",
    createdAt: "2021-02-16",
  },
];

interface IFormProps {
  text: string;
}

const HomePage = () => {
  const [data, setData] = useState(DefaultData);
  const [activedAddModal, setActivedAddModal] = useState(false);
  const { register, getValues, setValue, handleSubmit } = useForm<IFormProps>();

  const onAddQuestionClick = () => {
    setActivedAddModal(true);
  };

  const onSubmit = () => {
    const { text } = getValues();
    setData(prev => [
      { title: text, writer: "Kan", createdAt: "2021-02-16" },
      ...prev,
    ]);
    setActivedAddModal(false);
  };

  const onCancelClick = () => {
    setActivedAddModal(false);
  };

  return (
    <Layout>
      <div className="mt-10">
        <div className="mb-10 flex flex-col items-center md:flex-row md:justify-between">
          <h1 className="text-3xl font-medium mb-5 md:mb-0 ">
            엉뚱하지만 궁금해요!
          </h1>
          <button
            className="py-2 px-4 rounded-sm text-white bg-indigo-500 hover:bg-indigo-700 transition focus:outline-none"
            onClick={onAddQuestionClick}
          >
            🙋‍♂️ 질문있어요 🙋‍♀️
          </button>
        </div>
        <div>
          {data.map(question => (
            <Question
              title={question.title}
              writer={question.writer}
              createdAt={question.createdAt}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {activedAddModal && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 flex justify-center items-center">
          <div className="bg-gray-900 opacity-70 w-full h-full"></div>
          <div className="absolute w-full max-w-md p-4">
            <form
              className="w-full bg-white rounded-md p-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex justify-between items-center mb-5">
                <div className="text-lg font-medium">어떤 생각을 하셨나요?</div>
                <button
                  className="focus:outline-none"
                  type="reset"
                  onClick={onCancelClick}
                >
                  🅧
                </button>
              </div>
              <textarea
                ref={register({ required: "생각을 입력해주세요!" })}
                name="text"
                className="resize-none w-full border border-indigo-300 rounded-md p-2 h-18 mb-4 text-center"
                placeholder="엉뚱한 생각도 좋아요!"
              />
              <button className="w-full py-2 px-4 rounded-sm text-white bg-indigo-500 hover:bg-indigo-700 transition focus:outline-none">
                질문하기
              </button>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default HomePage;
