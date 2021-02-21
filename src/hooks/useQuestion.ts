import { dbService } from "firebase.confg";
import { useCallback, useState } from "react";
import { useRecoilState } from "recoil";
import { commentsAtom, questionAtom, questionsAtom } from "stores/store";

export const useQuestion = () => {
  const [question, setQuestion] = useRecoilState(questionAtom);
  const [questions, setQuestions] = useRecoilState(questionsAtom);
  const [comments, setComments] = useRecoilState(commentsAtom);
  const [questionLoading, setQuestionLoading] = useState(false);
  const [questionInitLoading, setQuestionInitLoading] = useState(false);
  const [questionUpdateLoading, setQuestionUpdateLoading] = useState(false);
  const [commentsInitLoading, setCommentsInitLoading] = useState(false);
  const [commentsUpdateLoading, setCommentsUpdateLoading] = useState(false);

  const getQuestions = useCallback(async () => {
    setQuestionInitLoading(true);
    try {
      const docs = await dbService
        .collection("questions")
        .orderBy("createdAt", "desc")
        .get();
      const questions: any[] = [];
      docs.forEach(doc => {
        questions.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setQuestions(questions);
    } catch (error) {
      console.log(error);
    }
    setQuestionInitLoading(false);
  }, [dbService]);

  const getQuestion = useCallback(
    async (questionId: string) => {
      const findQuestion = questions.find(
        question => question.id === questionId
      );
      if (findQuestion) {
        setQuestion(findQuestion);
        false;
      }
      setQuestionLoading(true);
      try {
        const doc = await dbService
          .collection("questions")
          .doc(questionId)
          .get();
        setQuestion({
          id: doc.id,
          ...doc.data(),
        } as any);
      } catch (error) {
        console.log(error);
      }
      setQuestionLoading(false);
    },
    [questions]
  );

  const getComments = useCallback(
    async (questionId: string) => {
      setCommentsInitLoading(true);
      try {
        const commentDocs = await dbService
          .collection("comments")
          .where("questionId", "==", questionId)
          .orderBy("createdAt")
          .get();

        const comments: CommentType[] = [];
        commentDocs.forEach(commentDoc => {
          const newComments = commentDoc.data() as CommentType;
          comments.push(newComments);
        });
        setComments(comments);
      } catch (error) {
        console.log(error);
      }
      setCommentsInitLoading(false);
    },
    [dbService]
  );

  const addQuestion = useCallback(
    async (question: QuestionType) => {
      setQuestionUpdateLoading(true);
      try {
        question.id = await dbService.collection("questions").doc().id;
        await dbService.collection("questions").doc(question.id).set(question);
        setQuestions(prev => [question, ...prev]);
      } catch (error) {
        console.log(error);
      }
      setQuestionUpdateLoading(false);
    },
    [dbService]
  );

  const deleteQuestion = useCallback(
    async (questionId: string) => {
      setQuestionUpdateLoading(true);
      try {
        await dbService.collection("questions").doc(questionId).delete();
        setQuestions(prev =>
          prev.filter(question => question.id !== questionId)
        );
      } catch (error) {
        console.log(error);
      }
      setQuestionUpdateLoading(false);
    },
    [dbService]
  );

  const addComment = useCallback(async (comment: CommentType) => {
    setCommentsUpdateLoading(true);
    try {
      comment.id = await dbService.collection(`comments`).doc().id;
      await dbService.collection(`comments`).doc(comment.id).set(comment);
      setComments(prev => [...prev, comment]);
    } catch (error) {
      console.log(error);
    }
    setCommentsUpdateLoading(false);
  }, []);

  return {
    questions,
    question,
    questionLoading,
    comments,
    questionInitLoading,
    questionUpdateLoading,
    commentsInitLoading,
    commentsUpdateLoading,
    addQuestion,
    deleteQuestion,
    addComment,
    getQuestions,
    getQuestion,
    getComments,
    setComments,
  };
};
