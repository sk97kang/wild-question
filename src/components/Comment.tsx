import React from "react";
import { Avatar } from "components/Avatar";

interface ICommentProps {
  comment: CommentType;
}

export const Comment: React.FC<ICommentProps> = ({ comment }) => {
  return (
    <div className="shadow-md rounded-md p-4 mb-2">
      <div className="flex justify-between items-center">
        <Avatar name={comment.writer.name} image={comment.writer.image} />
        <div className="text-sm font-light opacity-70">
          {new Date(comment.createdAt).toLocaleDateString()}
        </div>
      </div>
      <div className="font-medium mt-3">{comment.comment}</div>
    </div>
  );
};
