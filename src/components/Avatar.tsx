import React from "react";

interface IAvatarProps {
  size?: number;
  name?: string;
  image?: string;
}

export const Avatar: React.FC<IAvatarProps> = ({
  size = 24,
  name = "",
  image = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8cGVvcGxlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
}) => {
  return (
    <div className="flex items-center">
      <img
        src={image}
        className="rounded-full mr-2 bg-center bg-cover"
        width={size}
        height={size}
      />
      <div className="mr-4">{name}</div>
    </div>
  );
};
