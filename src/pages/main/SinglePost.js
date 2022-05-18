import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BigPost } from "../../components";
import { useAppContext } from "../../context/appContext";

function SinglePost() {
  const { singlePost, getSinglePost, getUserList, users, getAllUsers } =
    useAppContext();
  const { id } = useParams();

  useEffect(() => {
    getSinglePost(id);
  }, [id]);
  useEffect(() => {
    if (Object.keys(singlePost).length === 0) return;
    let userList = [];

    userList.push(singlePost.createdBy);
    singlePost.comment.map((comment) => {
      userList.push(comment.commentId);
    });

    userList = [...new Set(userList)];

    if (userList.length === 0) return;
    let listStr = "";
    userList.map((id) => {
      listStr += id + ",";
    });
    getAllUsers({ idList: listStr.slice(0, -1) });
  }, [singlePost]);

  if (Object.keys(singlePost).length === 0) return;
  return (
    <div className="feeds">
      <BigPost key={id} post={singlePost} />
    </div>
  );
}

export default SinglePost;
