import React from "react";

import { useAppContext } from "../context/appContext.js";
import SidebarNavView from "./SidebarNavView.js";
function BigSidebar() {
  const { logoutUser, user, switchRightBar } = useAppContext();
  const handleLogout = () => {
    logoutUser();
  };
  const handleShowRecommend = (e) => {
    switchRightBar("recommend", []);
  };
  return (
    <SidebarNavView
      handleLogout={handleLogout}
      handleShowRecommend={handleShowRecommend}
      user={user}
    />
  );
}

export default BigSidebar;
