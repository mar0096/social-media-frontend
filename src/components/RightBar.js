import React, { useEffect, useState } from "react";
import { Logo } from ".";
import { useAppContext } from "../context/appContext";
import { ImCross } from "react-icons/im";
import UserBox from "./UserBox.js";
import RightBox from "./RightBox";

function RightBar() {
  const {
    user,
    recommendUsers,
    requestUsers,
    getUserList,
    right,
    rightUsers,
    toggleRight,
    rightToggleShow,
  } = useAppContext();

  return (
    <div>
      <div>
        <span
          className={`btn btn-primary close-right  ${
            rightToggleShow ? "show-right" : ""
          }`}
          onClick={(e) => toggleRight(false)}
        >
          <ImCross />
        </span>
      </div>
      <div className={`right ${rightToggleShow ? "show-right" : ""}`}>
        {right === "recommend" ? (
          <div>
            <RightBox
              list={user.followRequest}
              boxName={"Request"}
              action={"request"}
            />

            <RightBox
              list={recommendUsers}
              boxName={"Recommend"}
              action={"follow"}
            />
          </div>
        ) : (
          <RightBox list={rightUsers} boxName={right} action={"follow"} />
        )}
      </div>
    </div>
  );
}

export default RightBar;
