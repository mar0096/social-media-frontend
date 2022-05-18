import moment from "moment";
import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/appContext";
import { CommentBox, UserBar } from "../components/index.js";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShareAlt,
  AiOutlineComment,
} from "react-icons/ai";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function BigPost({ post }) {
  const {
    user,
    editPost,
    postsUser,
    users,
    updatePost,
    switchRightBar,
    defaultImage,
    handleChange,
    toggleRight,
  } = useAppContext();
  let navigate = useNavigate();
  const [showComment, setShowComment] = useState(false);

  const handleLike = (e) => {
    e.preventDefault();
    updatePost({
      postId: post._id,
      action: post.like.includes(user._id) ? "unlike" : "like",
    });
  };
  const handleSave = (e) => {
    e.preventDefault();
    updatePost({
      postId: post._id,
      action: post.saveAcc.includes(user._id) ? "unsave" : "save",
    });
  };

  const handleShowComment = (e) => {
    e.preventDefault();
    setShowComment(!showComment);
  };

  const handleShowlike = (e) => {
    e.preventDefault();
    switchRightBar("likes", post.like);
    toggleRight(true);
  };

  const handleCopy = async (e) => {
    e.preventDefault();

    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(
        `${window.location.protocol}//${window.location.host}/post/${post._id}`
      );
    } else {
      return document.execCommand(
        "copy",
        true,
        `${window.location.protocol}//${window.location.host}/post/${post._id}`
      );
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    handleChange({
      caption: post.caption,
      imageSrc: post.imageSrc,
      isEditing: true,
      singlePost: post,
      hideComment: !post.showComment,
      archive: post.archive,
    });
    navigate(`/editPost/${post._id}`);
  };

  let date = moment(post.createdAt);

  let duration = moment.duration(moment().diff(date));
  if (duration.days() > 3) {
    date = date.format("MMM Do,YYYY");
  } else if (duration.days() > 0) {
    date = duration.days() + `day${duration.days() === 1 ? "" : "s"} ago`;
  } else if (duration.hours() > 0) {
    date = duration.hours() + `hour${duration.hours() === 1 ? "" : "s"} ago`;
  } else if (duration.minutes() > 0) {
    date =
      duration.minutes() + `minute${duration.minutes() === 1 ? "" : "s"} ago`;
  } else {
    date = "few seconds ago";
  }

  return (
    <div className="feed">
      <UserBar
        key={post.createdAt}
        postsUser={users[post.createdBy]}
        handleEdit={handleEdit}
      />
      <div className="photo">
        <img src={post.imageSrc || defaultImage} alt="defaultUser" />
      </div>
      <div className="action-buttons">
        <div className="interaction-button">
          <button onClick={handleLike} type="button">
            <span>
              {post.like.includes(user._id) ? (
                <AiFillHeart />
              ) : (
                <AiOutlineHeart />
              )}
            </span>
          </button>
          {post.showComment ? (
            <button onClick={handleShowComment} type="button">
              <span>
                <AiOutlineComment />
              </span>
            </button>
          ) : null}
          <button onClick={handleCopy}>
            <span>
              <AiOutlineShareAlt />
            </span>
          </button>
        </div>
        <div className="bookmark">
          <button onClick={handleSave} type="button">
            <span>
              {post.saveAcc.includes(user._id) ? (
                <FaBookmark />
              ) : (
                <FaRegBookmark />
              )}
            </span>
          </button>
        </div>
      </div>
      <div className="liked-by">
        <p className="point" onClick={handleShowlike}>
          <b>{post.like.length} </b>
          like{post.like.length > 1 ? "s" : ""}
        </p>
        <p>{date}</p>
      </div>

      <div className="caption">
        <p>
          <b>{users[post.createdBy] ? users[post.createdBy].username : ""}</b>
          {/* {post.caption} */}

          {post.caption.split("\n").map(function (item, idx) {
            return (
              <span key={idx}>
                {item
                  .trim()
                  .split(/\s+/)
                  .map((str, index) => {
                    return (
                      <span
                        key={index}
                        className={
                          str.length > 2 &&
                          str[0] === "#" &&
                          str.split("#").length === 2
                            ? "hashtag point"
                            : null
                        }
                      >
                        {`${str + "  "}`}
                      </span>
                    );
                  })}
                <br />
              </span>
            );
          })}
          {/* <span className="hash-tag">#456</span> */}
        </p>
      </div>
      {post.showComment ? (
        !showComment ? (
          Object.keys(post.comment).length > 0 ? (
            <button className=" text-muted point" onClick={handleShowComment}>
              View all {Object.keys(post.comment).length} comments
            </button>
          ) : (
            ""
          )
        ) : (
          <div className="comment">
            <CommentBox
              comments={post.comment}
              postId={post._id}
              key={post.createdAt}
            />
          </div>
        )
      ) : (
        <div className=" text-muted">comments are off</div>
      )}
    </div>
  );
}

export default BigPost;
