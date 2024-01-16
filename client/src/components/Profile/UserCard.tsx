import React from "react";

type UserCardProps = {
  name: string;
  age: number;
  profilePic?: string;
};

const UserCard = ({ profilePic }: UserCardProps) => {
  return <div>{profilePic && profilePic}</div>;
};

export default UserCard;
