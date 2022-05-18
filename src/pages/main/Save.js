import React, { useEffect } from "react";
import { BigPost, SmallPost } from "../../components";
import { useAppContext } from "../../context/appContext";

function Save() {
  const {
    isLoading,
    explorePosts,
    publicUsers,
    getListPosts,
    getSavePosts,
    savePosts,
    getAllPosts,
    user,
    users,
  } = useAppContext();

  useEffect(() => {
    console.log(user);
    if (user.savePosts.length === 0) return;
    getAllPosts({ idList: user.savePosts, store: "savePosts" });
  }, [user.savePosts]);

  if (isLoading) {
    return <h3>Loading</h3>;
  }
  if (user.savePosts.length === 0 || savePosts.length === 0) {
    return <div>No Post</div>;
  }
  return (
    <div className="feeds">
      <div className="small-post">
        {savePosts.map((post) => {
          return <SmallPost key={post._id} {...post} />;
        })}
      </div>
    </div>
  );
}

export default Save;
