import React, { useState, useEffect } from "react";

import { FormRow, Comment } from "./index.js";
import { useAppContext } from "../context/appContext";
import { RiSendPlaneFill } from "react-icons/ri";

function CommentBox({ comments, postId }) {
  const [input, setInput] = useState();
  const { user, updatePost } = useAppContext();

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    updatePost({ postId: postId, action: "addComment", comment: input.trim() });
    setInput("");
  };

  return (
    <form className="comments">
      {comments.map((comment, key) => {
        return <Comment comment={comment} key={key} postId={postId} />;
      })}
      <div className="inpt-comment-box">
        <textarea
          name="textarea"
          rows="10"
          cols="50"
          onChange={handleInput}
          value={input}
          className="inpt-comment"
          placeholder="Write a comment"
        ></textarea>
        <div className="action-buttons">
          <button type="button" onClick={handleSubmit}>
            <span>
              <RiSendPlaneFill />
            </span>
          </button>
        </div>
      </div>
    </form>
  );
}

export default CommentBox;
