import React from "react";
import { Avatar } from "components/Avatar";

interface IQuestionProps {
  question: QuestionType;
  onCardClick?: (id: string) => void;
}

export const Question: React.FC<IQuestionProps> = ({
  question,
  onCardClick = () => {},
}) => {
  return (
    <div
      className="shadow-md p-4 rounded-md mb-4 hover:shadow-lg transition cursor-pointer"
      onClick={() => onCardClick(question.id)}
    >
      <div className="text-xl font-medium mb-6 mt-4">{question.title}</div>
      <div className="text-sm font-medium opacity-70 flex items-center">
        <Avatar name={question.writer.name} image={question.writer.image} />
        <div className="text-sm opacity-70">
          {new Date(question.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};
