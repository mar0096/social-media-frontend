import React, { useEffect } from "react";
import { BigPost, SmallPost } from "../../components";
import { useAppContext } from "../../context/appContext";

function Explore() {
  const { isLoading, explorePosts, publicUsers, getAllPosts } = useAppContext();

  useEffect(() => {
    if (publicUsers.length === 0) return;
    let listStr = "";
    publicUsers.map((id) => {
      listStr += id + ",";
    });
    getAllPosts({ userList: listStr.slice(0, -1), store: "explorePosts" });
  }, [publicUsers]);

  if (isLoading) {
    return <h3>Loading</h3>;
  }
  if (explorePosts.length === 0) {
    return <div>No Post</div>;
  }
  return (
    <div className="feeds">
      <div className="small-post">
        {explorePosts.map((post) => {
          return <SmallPost key={post._id} {...post} />;
        })}
      </div>
    </div>
  );
}

export default Explore;
