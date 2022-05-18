import React from "react";
import UserBox from "./UserBox";

function RightBox({ list, boxName, action }) {
  return (
    <div className="friends-recommend">
      <h3>{boxName}</h3>
      <div className="friends">
        {list.length === 0 ? (
          <h4>No User</h4>
        ) : (
          list.map((userId) => {
            return <UserBox key={userId} userId={userId} action={action} />;
          })
        )}
      </div>
    </div>
  );
}

export default RightBox;
