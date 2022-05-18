import React, { useEffect } from "react";
import { BigPost } from "../../components";
import { useAppContext } from "../../context/appContext";

function Home() {
  const {
    homePosts,
    isPostLoading,
    getListPosts,
    user,
    getUserList,
    getAllPosts,
    getAllUsers,
  } = useAppContext();

  useEffect(() => {
    let listStr = "";
    if (user.following.length !== 0) {
      user.following.map((id) => {
        listStr += id + ",";
      });
    }

    listStr += user._id;
    getAllPosts({ userList: listStr, store: "homePosts" });
  }, []);

  useEffect(() => {
    let userList = [];
    homePosts.map((post) => {
      userList.push(post.createdBy);
      post.comment.map((comment) => {
        userList.push(comment.commentId);
      });
    });
    userList = [...new Set(userList)];

    if (userList.length === 0) return;
    let listStr = "";
    userList.map((id) => {
      listStr += id + ",";
    });

    getAllUsers({ idList: listStr.slice(0, -1) });
  }, [homePosts]);

  if (isPostLoading) {
    return <h3>Loading</h3>;
  }
  if (homePosts.length === 0) {
    return <div>No Post</div>;
  }
  return (
    <div className="feeds">
      {homePosts.map((post, id) => {
        return <BigPost key={id} post={post} />;
      })}
    </div>
  );
}

export default Home;
