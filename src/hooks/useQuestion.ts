import { dbService } from "firebase.confg";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { commentsAtom, questionsAtom } from "stores/store";

export const useQuestion = () => {
  const [questions, setQuestions] = useRecoilState(questionsAtom);
  const [comments, setComments] = useRecoilState(commentsAtom);
  const [loading, setLoading] = useState(false);
  const [questionLoading, setQuestionLoading] = useState(false);
  const [commentsInitLoading, setCommentsInitLoading] = useState(false);
  const [commentsUpdateLoading, setCommentsUpdateLoading] = useState(false);

  const getQuestions = useCallback(async () => {
    setLoading(true);
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
          isMine: false,
        });
      });
      setQuestions(newQuestions);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [dbService]);

  const getQuestion = useCallback(
    (questionId: string) => {
      return questions.find(question => question.id === questionId);
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

  const addQuestion = useCallback(async (question: QuestionType) => {
    setQuestionLoading(true);
    try {
      question.id = await dbService.collection("questions").doc().id;
      await dbService.collection("questions").doc(question.id).set(question);
      setQuestions(prev => [question, ...prev]);
    } catch (error) {
      console.log(error);
    }
    setQuestionLoading(false);
  }, []);

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

  useEffect(() => {
    if (questions.length === 0) {
      getQuestions();
    }
  }, []);

  return {
    questions,
    comments,
    loading,
    questionLoading,
    commentsInitLoading,
    commentsUpdateLoading,
    addQuestion,
    addComment,
    setComments,
    getQuestions,
    getQuestion,
    getComments,
  };
};
