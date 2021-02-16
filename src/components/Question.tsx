import React from "react";

interface IQuestionProps {
  title: string;
  writer: string;
  createdAt: string;
}

export const Question: React.FC<IQuestionProps> = ({
  title,
  writer,
  createdAt,
}) => {
  return (
    <div className="shadow-md p-4 rounded-md mb-8 hover:shadow-lg transition cursor-pointer">
      <div className="text-xl font-medium mb-6 mt-4">{title}</div>
      <div className="text-sm font-medium opacity-70 flex items-center">
        <div
          className="bg-gray-500 w-6 h-6 rounded-full mr-2 bg-center bg-cover"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8cGVvcGxlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60)`,
          }}
        ></div>
        <div className="mr-4">{writer}</div>
        <div className="text-sm opacity-70">{createdAt}</div>
      </div>
    </div>
  );
};
