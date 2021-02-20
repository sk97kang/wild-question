import React from "react";

interface IModalProps {
  isVisible: boolean;
  register: any;
  title: string;
  buttonTitle: string;
  onSubmit: () => void;
  onCancelClick?: () => void;
}

export const Modal: React.FC<IModalProps> = ({
  isVisible,
  register,
  title,
  buttonTitle,
  onSubmit,
  onCancelClick,
}) => {
  if (!isVisible) {
    return null;
  }
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-10 flex justify-center items-center">
      <div className="bg-gray-900 opacity-70 w-full h-full"></div>
      <div className="absolute w-full max-w-md p-4">
        <form className="w-full bg-white rounded-md p-8" onSubmit={onSubmit}>
          <div className="flex justify-between items-center mb-5">
            <div className="text-lg font-medium">{title}</div>
            <button
              className="focus:outline-none"
              type="reset"
              onClick={onCancelClick}
            >
              🅧
            </button>
          </div>
          <textarea
            ref={register({ required: "생각을 입력해주세요!" })}
            name="text"
            className="resize-none w-full border border-indigo-300 rounded-md p-2 h-18 mb-4"
            placeholder="엉뚱한 생각도 좋아요!"
          />
          <button className="w-full py-2 px-4 rounded-sm text-white bg-indigo-500 hover:bg-indigo-700 transition focus:outline-none">
            {buttonTitle}
          </button>
        </form>
      </div>
    </div>
  );
};
