type UserType = {
  id: string;
  name: string;
  image: string;
};

type QuestionType = {
  id: string;
  title: string;
  writer: UserType;
  createdAt: number;
};

type CommentType = {
  id: string;
  questionId: string;
  comment: string;
  writer: UserType;
  createdAt: number;
};
