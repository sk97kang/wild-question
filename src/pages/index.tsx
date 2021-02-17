import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Layout } from "components/Layout";
import { Question } from "components/Question";
import { authService, dbService } from "firebase.confg";
import { useRecoilState } from "recoil";
import { userState } from "stores/user";

interface IFormProps {
  text: string;
}

const HomePage = () => {
  const [user, setUser] = useRecoilState(userState);
  const [questionLoading, setQuestionLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged(user => {
      if (user) {
        const userObj = {
          displayName: user.displayName || "",
          photoURL: user.photoURL || "",
          uid: user.uid,
        };
        setUser(userObj);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const [data, setData] = useState<QuestionType[]>([]);
  const [activedAddModal, setActivedAddModal] = useState(false);
  const { register, getValues, setValue, handleSubmit } = useForm<IFormProps>();
  const questionsRef = dbService.collection("questions");

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
          writer: {
            id: user.uid,
            name: user.displayName,
            image: user.photoURL,
          },
          createdAt: Date.now(),
        };
        await questionsRef.doc(newId).set(newData);
        setData(prev => [newData, ...prev]);
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

  const getQuestionData = async () => {
    try {
      const docs = await questionsRef.get();
      const newData: any = [];
      docs.forEach(doc => {
        newData.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setData(newData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQuestionData();
  }, []);

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
              key={question.id}
              question={question}
              onCardClick={onQuestionClick}
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
                className="resize-none w-full border border-indigo-300 rounded-md p-2 h-18 mb-4"
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
