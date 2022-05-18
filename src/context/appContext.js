import React, { useReducer, useContext } from "react";
import {
  LOGOUT_USER,
  CLEAR_VALUES,
  BEGIN,
  SUCCESS,
  ERROR,
  SWITCH_RIGHT,
  TOGGLE_RIGHT,
} from "./actions";

import reducer from "./reducers";
import axios from "axios";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

// const image = localStorage.getItem("image");
const userParse = JSON.parse(user);
const initialState = {
  isLoading: false,
  isPostLoading: false,
  isProfileLoading: false,
  isRightBarLoading: false,
  isImageLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: userParse || null,
  targetUser: null,
  token: token,

  editPostId: "",
  imageSrc: "",

  defaultImage:
    "https://res.cloudinary.com/ddwbkndrj/image/upload/v1652512100/image/tmp-2-1652512101009_hh76yn.png",

  users: userParse ? { [userParse["_id"]]: userParse } : {},
  postsUser: {},
  recommendUsers: [],
  publicUsers: [],
  requestUsers: [],
  rightUsers: [],
  searchUsers: [],
  posts: [],
  homePosts: [],
  explorePosts: [],
  userPosts: [],
  searchPosts: [],
  savePosts: [],
  singlePost: {},
  right: "recommend",
  rightToggleShow: false,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const authFetch = axios.create({
    baseURL: "/api/v1",
  });

  authFetch.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = (alertText) => {
    dispatch({
      type: ERROR,
      payload: {
        alertText: alertText,
      },
    });

    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({
        type: SUCCESS,
        payload: { showAlert: false, alertType: "", alertText: "" },
      });
    }, 3000);
  };

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // ---------------- AUTH -------------------

  const registerUser = async (currentUser) => {
    dispatch({ type: BEGIN, payload: { isLoading: true } });
    try {
      const response = await authFetch.post("/auth/register", currentUser);

      const { user, token } = response.data;
      dispatch({
        type: SUCCESS,
        payload: {
          user: user,
          users: { [user._id]: user },
          token: token,
          showAlert: true,
          isLoading: false,
          alertType: "success",
          alertText: "User Created! Redirecting...",
        },
      });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: { alertText: error.response.data.msg, isLoading: false },
      });
    }
    clearAlert();
  };

  const loginUser = async (currentUser) => {
    dispatch({ type: BEGIN, payload: { isLoading: true } });
    try {
      const { data } = await authFetch.post("/auth/login", currentUser);

      const { user, token } = data;
      dispatch({
        type: SUCCESS,
        payload: {
          user: user,
          users: { [user._id]: user },
          token: token,
          showAlert: true,
          isLoading: false,
          alertType: "success",
          alertText: "Login Successful! Redirecting...",
        },
      });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: { alertText: error.response.data.msg, isLoading: false },
      });
    }
    clearAlert();
  };
  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };
  const updateUser = async (currentUser, imageSrc) => {
    dispatch({ type: BEGIN, payload: { isProfileLoading: true } });

    try {
      if (imageSrc) {
        currentUser.profileImage = imageSrc;
      }
      const hashtag = [];
      currentUser.bio
        .trim()
        .split(/\s+/)
        .map((str) => {
          if (str.length > 2 && str[0] === "#" && str.split("#").length === 2) {
            hashtag.push(str);
          }
        });
      currentUser.hashtag = hashtag;
      console.log(hashtag);
      const { data } = await authFetch.patch("/auth/updateUser", currentUser);
      const { user: userData, token } = data;
      console.log(userData);
      // const userParse = JSON.parse(userData);

      dispatch({
        type: SUCCESS,
        payload: {
          user: userData,
          users: { [userData._id]: userData },
          token: token,
          showAlert: true,
          isProfileLoading: false,
          alertType: "success",
          alertText: "User Profile Updated",
        },
      });
      addUserToLocalStorage({ user: userData, token });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: ERROR,
          payload: {
            alertText: error.response.data.msg,
            isProfileLoading: false,
          },
        });
      }
    }
    clearAlert();
  };

  // -----------------------------------
  const uploadImage = async (selectedFile) => {
    const formData = new FormData();
    formData.append("image", selectedFile);
    dispatch({ type: BEGIN, payload: { isImageLoading: true } });
    try {
      const {
        data: {
          image: { src },
        },
      } = await axios.post("api/v1/upload/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch({
        type: SUCCESS,
        payload: {
          isImageLoading: false,
          showAlert: true,
          alertType: "success",
          alertText: "Image Updated",
          imageSrc: src,
        },
      });
      console.log(src);
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: { alertText: error.response.data.msg, isImageLoading: false },
      });
    }
    clearAlert();
  };

  // const handleChange = ({
  //   caption,
  //   imageSrc,
  //   isEditing,
  //   singlePost,
  //   hideComment,
  //   archive,
  // }) => {
  //   dispatch({
  //     type: SUCCESS,
  //     payload: {
  //       caption: caption,
  //       imageSrc: imageSrc,
  //       isEditing: isEditing,
  //       singlePost: singlePost,
  //       hideComment: hideComment,
  //       archive: archive,
  //     },
  //   });
  //   // console.log(caption);
  // };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const toggleRight = (value) => {
    dispatch({
      type: TOGGLE_RIGHT,
      payload: { rightToggleShow: value },
    });
  };

  // ---------------- POST -------------------

  const createPost = async ({ values }) => {
    dispatch({ type: BEGIN, payload: { isPostLoading: true } });

    try {
      const hashtag = [];
      values.caption
        .trim()
        .split(/\s+/)
        .map((str) => {
          if (str.length > 2 && str[0] === "#" && str.split("#").length === 2) {
            hashtag.push(str);
          }
        });

      await authFetch.post("/post", {
        imageSrc: state.imageSrc,
        caption: values.caption,
        userId: state.user._id,
        hashtag: hashtag,
        showComment: !values.hideComment,
        archive: values.archive,
      });
      dispatch({
        type: SUCCESS,
        payload: {
          isPostLoading: false,
          showAlert: true,
          alertType: "success",
          alertText: "New Post Created",
        },
      });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      console.log(error);
      dispatch({
        type: ERROR,
        payload: { alertText: error.response.data.msg, isPostLoading: false },
      });
    }
    clearAlert();
  };

  // const getExplorePosts = async () => {
  //   dispatch({
  //     type: BEGIN,
  //     payload: {
  //       isPostLoading: true,
  //     },
  //   });

  //   try {
  //     const {
  //       data: { posts },
  //     } = await authFetch.get("/post");

  //     dispatch({
  //       type: SUCCESS,
  //       payload: {
  //         posts: posts,
  //         isPostLoading: false,
  //       },
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     // logoutUser();
  //   }
  //   clearAlert();
  // };

  const getAllPosts = async ({ idList, userList, search, store }) => {
    dispatch({
      type: BEGIN,
      payload: {
        isPostLoading: true,
      },
    });
    try {
      const {
        data: { posts },
      } = await authFetch.get(
        `/post?${idList ? `idList=${String(idList)}` : ""}${
          userList ? `userList=${String(userList)}` : ""
        }${search ? `search=${String(search)}` : ""}`
      );
      dispatch({
        type: SUCCESS,
        payload: {
          isPostLoading: false,
          [store]: posts,
        },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ERROR,
        payload: { alertText: error.response.data.msg, isPostLoading: false },
      });
    }
    clearAlert();
  };

  const getSinglePost = async (id) => {
    dispatch({
      type: BEGIN,
      payload: {
        isPostLoading: true,
      },
    });
    try {
      const {
        data: { post },
      } = await authFetch.get(`/post/${id}`);
      dispatch({
        type: SUCCESS,
        payload: {
          isPostLoading: false,
          singlePost: post,
        },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ERROR,
        payload: { alertText: error.response.data.msg, isPostLoading: false },
      });
    }
    clearAlert();
  };

  const updatePost = async ({ postId, action, comment, values }) => {
    // dispatch({
    //   type: BEGIN,
    //   payload: {
    //     isPostLoading: true,
    //   },
    // });

    try {
      const hashtag = [];
      if (values) {
        values.caption
          .trim()
          .split(/\s+/)
          .map((str) => {
            if (
              str.length > 2 &&
              str[0] === "#" &&
              str.split("#").length === 2
            ) {
              hashtag.push(str);
            }
          });
      }

      const {
        data: { post: returnPost, user: returnUser },
      } = await authFetch.patch(`/post/${postId}`, {
        userId: state.user._id,
        action,
        comment,
        showComment: values ? !values.hideComment : false,
        archive: values ? values.archive : false,
        caption: values ? values.caption : "",
        hashtag: hashtag,
      });
      console.log(returnUser);

      const homePosts = state.homePosts;
      homePosts.map((post, index) => {
        if (post._id === returnPost._id) {
          homePosts[index] = returnPost;
        }
      });
      dispatch({
        type: SUCCESS,
        payload: {
          homePosts: homePosts,
          singlePost: returnPost,
          users: { [returnUser._id]: returnUser },
          user: returnUser,
          // showAlert: true,
          // alertType: "success",
          // alertText: "Post Edited",
        },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ERROR,
        payload: { alertText: error.response.data.msg, isPostLoading: false },
      });
    }
    clearAlert();
  };

  const deletePost = async (postId) => {
    try {
      const { data } = await authFetch.delete(`/post/${postId}`);

      dispatch({
        type: SUCCESS,
        payload: {},
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: { alertText: error.response.data.msg, isPostLoading: false },
      });
    }
  };

  // const getSearchPosts = async (search) => {
  //   dispatch({
  //     type: BEGIN,
  //     payload: {
  //       isPostLoading: true,
  //     },
  //   });
  //   try {
  //     const {
  //       data: { posts },
  //     } = await authFetch.get(`/post?search=${search}`);
  //     dispatch({
  //       type: SUCCESS,
  //       payload: {
  //         isPostLoading: false,
  //         searchPosts: posts,
  //       },
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     dispatch({
  //       type: ERROR,
  //       payload: { alertText: error.response.data.msg, isPostLoading: false },
  //     });
  //   }
  //   clearAlert();
  // };

  // const getSavePosts = async (saveList) => {
  //   dispatch({
  //     type: BEGIN,
  //     payload: {
  //       isPostLoading: true,
  //     },
  //   });
  //   try {
  //     console.log(saveList);
  //     saveList = String(saveList);
  //     console.log(saveList);
  //     const {
  //       data: { posts },
  //     } = await authFetch.get(`/post?idList=${saveList}`);
  //     dispatch({
  //       type: SUCCESS,
  //       payload: {
  //         isPostLoading: false,
  //         savePosts: posts,
  //       },
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     dispatch({
  //       type: ERROR,
  //       payload: { alertText: error.response.data.msg, isPostLoading: false },
  //     });
  //   }
  //   clearAlert();
  // };

  // ---------------- USER -------------------

  //-------------------------------------

  const getSingleUser = async (id) => {
    console.log("get single user");
    dispatch({
      type: BEGIN,
      payload: {
        isProfileLoading: true,
      },
    });
    try {
      const {
        data: { user: singleUser },
      } = await authFetch.get(`/user/${id}`);
      console.log(singleUser);
      dispatch({
        type: SUCCESS,
        payload: {
          isProfileLoading: false,
          users: { [singleUser._id]: singleUser },
        },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ERROR,
        payload: {
          alertText: error.response.data.msg,
          isProfileLoading: false,
        },
      });
    }
    clearAlert();
  };

  // const getUserList = async (listStr) => {
  //   dispatch({
  //     type: BEGIN,
  //     payload: {
  //       // isProfileLoading: true,
  //     },
  //   });
  //   try {
  //     const {
  //       data: { users },
  //     } = await authFetch.get(`/user?idList=${listStr}`);

  //     const userObject = {};
  //     users.map((user) => {
  //       userObject[user._id] = user;
  //     });

  //     dispatch({
  //       type: SUCCESS,
  //       payload: {
  //         // isProfileLoading: false,
  //         users: userObject ,
  //       },
  //     });
  //   } catch (error) {
  //     dispatch({
  //       type: ERROR,
  //       payload: {
  //         alertText: error.response.data.msg,
  //         // isProfileLoading: false,
  //       },
  //     });
  //   }
  //   clearAlert();
  // };

  const getAllUsers = async ({
    idList = false,
    follower = false,
    me = false,
    request = false,
    isPrivate = false,
    search = false,
    store,
  }) => {
    dispatch({
      type: BEGIN,
      payload: {
        // isRightBarLoading: true,
      },
    });
    try {
      const url = `${idList ? `idList=${String(idList)}` : ""}${
        follower ? `&follower=1` : ""
      }${request ? `&request=1` : ""}${me ? `&me=1` : ""}${
        isPrivate ? `&private=1` : ""
      }${search ? `&search=${search}` : ""}`;
      const {
        data: { users },
      } = await authFetch.get(
        `/user?${url[0] === "&" ? url.slice(1, url.length) : url}`
      );
      const usersList = [];
      const usersObject = {};
      users.map((user) => {
        usersList.push(user._id);
        usersObject[user._id] = user;
      });

      dispatch({
        type: SUCCESS,
        payload: {
          // isRightBarLoading: false,
          [store]: usersList,
          users: usersObject,
        },
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: {
          alertText: error.response.data.msg,
          isRightBarLoading: false,
        },
      });
    }
    clearAlert();
  };

  const getRequestUser = () => {
    dispatch({
      type: BEGIN,
      payload: {
        isRightBarLoading: true,
      },
    });
    try {
      let requestUserList = [];
      state.user.followRequest.map(async (id) => {
        const {
          data: { singleUser },
        } = await authFetch.get(`/user/user/${id}`);
        requestUserList.push(singleUser);
        console.log(singleUser);
      });

      dispatch({
        type: SUCCESS,
        payload: {
          requestUser: requestUserList,
          isRightBarLoading: false,
        },
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: {
          alertText: error.response.data.msg,
          isRightBarLoading: false,
        },
      });
    }
    clearAlert();
  };

  const followUser = async (targetUserId, action) => {
    // dispatch({ type: BEGIN });
    console.log(targetUserId, action);
    try {
      const {
        data: { user: userData, target },
      } = await authFetch.patch(`/user/${targetUserId}`, {
        targetUser: targetUserId,
        action: action,
      });
      console.log(userData, target);
      dispatch({
        type: SUCCESS,
        payload: {
          user: userData,
          users: {
            [userData._id]: userData,
            [target._id]: target,
          },
        },
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: ERROR,
        payload: { alertText: error.response.data.msg },
      });
    }
    clearAlert();
  };

  // const getSearchUsers = async (search) => {
  //   dispatch({
  //     type: BEGIN,
  //     payload: {
  //       // isProfileLoading: true,
  //     },
  //   });
  //   try {
  //     const {
  //       data: { users },
  //     } = await authFetch.get(`/user/search/${search}`);
  //     const userObject = {};
  //     const userList = [];
  //     users.map((user) => {
  //       userObject[user._id] = user;
  //       userList.push(user._id);
  //     });
  //     dispatch({
  //       type: SUCCESS,
  //       payload: {
  //         // isProfileLoading: false,
  //         users:  userObject ,
  //         searchUsers: userList,
  //       },
  //     });
  //   } catch (error) {
  //     dispatch({
  //       type: ERROR,
  //       payload: {
  //         alertText: error.response.data.msg,
  //         // isProfileLoading: false,
  //       },
  //     });
  //   }
  //   clearAlert();
  // };

  // ---------------- USER -------------------

  const switchRightBar = (page, list) => {
    dispatch({
      type: SWITCH_RIGHT,
      payload: { right: page, rightUsers: list },
    });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        updateUser,
        logoutUser,
        uploadImage,
        clearValues,
        createPost,
        getAllPosts,
        updatePost,
        deletePost,
        getSingleUser,
        followUser,
        getAllUsers,
        getRequestUser,
        switchRightBar,
        getSinglePost,
        toggleRight,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
