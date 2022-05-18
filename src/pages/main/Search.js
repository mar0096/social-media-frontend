import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppContext } from "../../context/appContext";

import { SmallPost } from "../../components";

function Search() {
  const {
    getSearchPosts,
    searchPosts,
    switchRightBar,
    getSearchUsers,
    searchUsers,
    getAllUsers,
    getAllPosts,
  } = useAppContext();
  const searchInput = useLocation().search.split("=")[1];
  useEffect(() => {
    getAllUsers({ search: searchInput, store: "searchUsers" });

    getAllPosts({ search: searchInput, store: "searchPosts" });
  }, [searchInput]);
  useEffect(() => {
    switchRightBar("search", searchUsers);
  }, [searchUsers]);
  if (searchPosts.length === 0) return <div>No Post</div>;
  return (
    <div className="feeds">
      <h3>{`Searching hashtag ${searchInput}`}</h3>
      <div className="small-post">
        {searchPosts.map((post) => {
          return <SmallPost key={post._id} {...post} />;
        })}
      </div>
    </div>
  );
}

export default Search;
