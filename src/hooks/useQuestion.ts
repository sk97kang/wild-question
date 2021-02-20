import { dbService } from "firebase.confg";
import { useEffect, useState } from "react";

export const useQuestion = () => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [loading, setLoading] = useState(true);

  const getQuestions = async () => {
    try {
      const docs = await dbService
        .collection("questions")
        .orderBy("createdAt", "desc")
        .get();
      const newQuestions: any[] = [];
      docs.forEach(doc => {
        newQuestions.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setQuestions(newQuestions);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getQuestions();
  });

  return {
    questions,
    loading,
    setQuestions,
    getQuestions,
  };
};
