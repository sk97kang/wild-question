import React from "react";
import { Avatar } from "components/Avatar";

interface ICommentProps {
  comment: CommentType;
  onDeleteClick: (commentId: string) => void;
}

export const Comment: React.FC<ICommentProps> = ({
  comment,
  onDeleteClick,
}) => {
  return (
    <div className="shadow-md rounded-md p-4 mb-2">
      <div className="flex justify-between items-start">
        <Avatar name={comment.writer.name} image={comment.writer.image} />
        {comment.isMine && (
          <div className="flex border">
            <button
              className="p-1 text-xs focus:outline-none hover:bg-red-500 hover:text-white transition-all"
              onClick={() => onDeleteClick(comment.id)}
            >
              <span>삭제하기</span>
            </button>
          </div>
        )}
      </div>
      <div className="flex justify-between items-center">
        <div className="font-medium mt-3">{comment.comment}</div>
        <div className="text-sm font-light opacity-70">
          {new Date(comment.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};
