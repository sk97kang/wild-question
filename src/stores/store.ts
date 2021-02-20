import { atom } from "recoil";

export const userAtom = atom<UserType | null>({
  key: "userAtom",
  default: null,
});

export const questionsAtom = atom<QuestionType[]>({
  key: "questionsAtom",
  default: [],
});

export const commentsAtom = atom<CommentType[]>({
  key: "commentsAtom",
  default: [],
});
