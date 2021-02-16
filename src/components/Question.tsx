import React from "react";
import { Avatar } from "./Avatar";

interface IQuestionProps {
  id: number;
  title: string;
  writer: string;
  createdAt: string;
  onCardClick?: (id: number) => void;
}

export const Question: React.FC<IQuestionProps> = ({
  id,
  title,
  writer,
  createdAt,
  onCardClick = () => {},
}) => {
  return (
    <div
      className="shadow-md p-4 rounded-md mb-8 hover:shadow-lg transition cursor-pointer"
      onClick={() => onCardClick(id)}
    >
      <div className="text-xl font-medium mb-6 mt-4">{title}</div>
      <div className="text-sm font-medium opacity-70 flex items-center">
        <Avatar name={writer} />
        <div className="text-sm opacity-70">{createdAt}</div>
      </div>
    </div>
  );
};
