import React from "react";
import { Avatar } from "./Avatar";

export const Comment = () => {
  return (
    <div className="shadow-md rounded-md p-4 mb-2">
      <div className="flex justify-between items-center">
        <Avatar />
        <div className="text-sm font-light opacity-70">2021-02-13</div>
      </div>
      <div className="font-medium mt-3">
        타꼬야끼를 먹어보세요! 마임이 따뜻해져욤!
      </div>
    </div>
  );
};
