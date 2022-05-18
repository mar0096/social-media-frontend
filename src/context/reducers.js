import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  UPLOAD_IMAGE_BEGIN,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_ERROR,
  LOGOUT_USER,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_POST_BEGIN,
  CREATE_POST_SUCCESS,
  CREATE_POST_ERROR,
  EDIT_POST_BEGIN,
  EDIT_POST_SUCCESS,
  EDIT_POST_ERROR,
  GET_HOME_POST_BEGIN,
  GET_HOME_POST_SUCCESS,
  FOLLOW_USER_BEGIN,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_ERROR,
  GET_USER_BEGIN,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  GET_RECOMMEND_USER_BEGIN,
  GET_RECOMMEND_USER_SUCCESS,
  GET_RECOMMEND_USER_ERROR,
  GET_REQUEST_USER_BEGIN,
  GET_REQUEST_USER_SUCCESS,
  GET_REQUEST_USER_ERROR,
  ADD_COMMENT_BEGIN,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_ERROR,
  DELETE_COMMENT_BEGIN,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_ERROR,
  BEGIN,
  SUCCESS,
  ERROR,
  SWITCH_RIGHT,
  TOGGLE_RIGHT,
} from "./actions";
import { initialState } from "./appContext.js";

const reducer = (state, action) => {
  switch (action.type) {
    case BEGIN:
      return {
        ...state,
        isPostLoading:
          typeof action.payload.isPostLoading !== "undefined"
            ? action.payload.isPostLoading
            : state.isPostLoading,
        isProfileLoading:
          typeof action.payload.isProfileLoading !== "undefined"
            ? action.payload.isProfileLoading
            : state.isProfileLoading,
        isRightBarLoading:
          typeof action.payload.isRightBarLoading !== "undefined"
            ? action.payload.isRightBarLoading
            : state.isRightBarLoading,
        isImageLoading:
          typeof action.payload.isImageLoading !== "undefined"
            ? action.payload.isImageLoading
            : state.isImageLoading,
      };
    case SUCCESS:
      return {
        ...state,

        isPostLoading:
          typeof action.payload.isPostLoading !== "undefined"
            ? action.payload.isPostLoading
            : state.isPostLoading,
        isProfileLoading:
          typeof action.payload.isProfileLoading !== "undefined"
            ? action.payload.isProfileLoading
            : state.isProfileLoading,
        isRightBarLoading:
          typeof action.payload.isRightBarLoading !== "undefined"
            ? action.payload.isRightBarLoading
            : state.isRightBarLoading,
        isImageLoading:
          typeof action.payload.isImageLoading !== "undefined"
            ? action.payload.isImageLoading
            : state.isImageLoading,
        showAlert:
          typeof action.payload.showAlert !== "undefined"
            ? action.payload.showAlert
            : state.showAlert,
        alertText: action.payload.alertText || state.alertText,
        alertType: action.payload.alertType || state.alertType,
        user: action.payload.user || state.user,
        targetUser: action.payload.targetUser || state.targetUser,
        token: action.payload.token || state.token,
        isEditing:
          typeof action.payload.isEditing !== "undefined"
            ? action.payload.isEditing
            : state.isEditing,
        editPostId: action.payload.editPostId || state.editPostId,
        imageSrc: action.payload.imageSrc || state.imageSrc,
        caption: action.payload.caption || state.caption,
        hideComment:
          typeof action.payload.hideComment !== "undefined"
            ? action.payload.hideComment
            : state.hideComment,
        archive:
          typeof action.payload.archive !== "undefined"
            ? action.payload.archive
            : state.archive,
        posts: action.payload.posts || state.posts,
        postsUsers: action.payload.postsUsers || state.postsUsers,
        recommendUsers: action.payload.recommendUsers || state.recommendUsers,
        requestUsers: action.payload.requestUsers || state.requestUsers,
        searchUsers: action.payload.searchUsers || state.searchUsers,
        homePosts: action.payload.homePosts || state.homePosts,
        explorePosts: action.payload.explorePosts || state.explorePosts,
        userPosts: action.payload.userPosts || state.userPosts,
        searchPosts: action.payload.searchPosts || state.searchPosts,
        singlePost: action.payload.singlePost || state.singlePost,
        savePosts: action.payload.savePosts || state.savePosts,
        users: { ...state.users, ...action.payload.users },
        publicUsers: action.payload.publicUsers || state.publicUsers,
      };
    case ERROR:
      return {
        ...state,
        isPostLoading:
          typeof action.payload.isPostLoading !== "undefined"
            ? action.payload.isPostLoading
            : state.isPostLoading,
        isProfileLoading:
          typeof action.payload.isProfileLoading !== "undefined"
            ? action.payload.isProfileLoading
            : state.isProfileLoading,
        isRightBarLoading:
          typeof action.payload.isRightBarLoading !== "undefined"
            ? action.payload.isRightBarLoading
            : state.isRightBarLoading,
        isImageLoading:
          typeof action.payload.isImageLoading !== "undefined"
            ? action.payload.isImageLoading
            : state.isImageLoading,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.alertText,
      };
    case SWITCH_RIGHT:
      return {
        ...state,
        right: action.payload.right,
        rightUsers: action.payload.rightUsers,
      };
    case TOGGLE_RIGHT:
      return {
        ...state,
        rightToggleShow: action.payload.rightToggleShow,
      };
  }

  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all values",
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }
  // if (action.type === REGISTER_USER_BEGIN) {
  //   return { ...state, isLoading: true };
  // }
  // if (action.type === REGISTER_USER_SUCCESS) {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     token: action.payload.token,
  //     user: action.payload.user,
  //     showAlert: true,
  //     alertType: "success",
  //     alertText: "User Created! Redirecting...",
  //   };
  // }
  // if (action.type === REGISTER_USER_ERROR) {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     showAlert: true,
  //     alertType: "danger",
  //     alertText: action.payload.msg,
  //   };
  // }
  // if (action.type === LOGIN_USER_BEGIN) {
  //   return { ...state, isLoading: true };
  // }
  // if (action.type === LOGIN_USER_SUCCESS) {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     token: action.payload.token,
  //     user: action.payload.user,
  //     showAlert: true,
  //     alertType: "success",
  //     alertText: "Login Successful! Redirecting...",
  //   };
  // }
  // if (action.type === LOGIN_USER_ERROR) {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     showAlert: true,
  //     alertType: "danger",
  //     alertText: action.payload.msg,
  //   };
  // }
  // if (action.type === UPDATE_USER_BEGIN) {
  //   return { ...state, isLoading: true };
  // }
  // if (action.type === UPDATE_USER_SUCCESS) {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     token: action.payload.token,
  //     user: action.payload.user,
  //     showAlert: true,
  //     alertType: "success",
  //     alertText: "User Profile Updated",
  //   };
  // }
  // if (action.type === UPDATE_USER_ERROR) {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     showAlert: true,
  //     alertType: "danger",
  //     alertText: action.payload.msg,
  //   };
  // }
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
    };
  }
  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      caption: action.payload.caption,
      imageSrc: action.payload.imageSrc,
    };
  }
  if (action.type === CLEAR_VALUES) {
    return {
      ...state,
      caption: "",
      imageSrc: "",
      hideComment: false,
      archive: false,
    };
  }

  // if (action.type === UPLOAD_IMAGE_BEGIN) {
  //   return { ...state, isLoading: true };
  // }
  // if (action.type === UPLOAD_IMAGE_SUCCESS) {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     showAlert: true,
  //     alertType: "success",
  //     alertText: "Image Updated",
  //     imageSrc: action.payload.imageSrc,
  //   };
  // }
  // if (action.type === UPLOAD_IMAGE_ERROR) {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     showAlert: true,
  //     alertType: "danger",
  //     alertText: action.payload.msg,
  //   };
  // }

  // if (action.type === CREATE_POST_BEGIN) {
  //   return { ...state, isLoading: true };
  // }
  // if (action.type === CREATE_POST_SUCCESS) {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     showAlert: true,
  //     alertType: "success",
  //     alertText: "New Post Created",
  //   };
  // }
  // if (action.type === CREATE_POST_ERROR) {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     showAlert: true,
  //     alertType: "danger",
  //     alertText: action.payload.msg,
  //   };
  // }

  // if (action.type === EDIT_POST_BEGIN) {
  //   return { ...state, isLoading: true };
  // }
  // if (action.type === EDIT_POST_SUCCESS) {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     showAlert: true,
  //     alertType: "success",
  //     alertText: "New Post Created",
  //     posts: action.payload.posts,
  //   };
  // }
  // if (action.type === EDIT_POST_ERROR) {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     showAlert: true,
  //     alertType: "danger",
  //     alertText: action.payload.msg,
  //   };
  // }

  // if (action.type === GET_HOME_POST_BEGIN) {
  //   return { ...state, isLoading: true, showAlert: false };
  // }
  // if (action.type === GET_HOME_POST_SUCCESS) {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     posts: action.payload.posts,
  //     postsUser: action.payload.postsUser,
  //   };
  // }

  // if (action.type === FOLLOW_USER_BEGIN) {
  //   return { ...state, isLoading: true };
  // }
  // if (action.type === FOLLOW_USER_SUCCESS) {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     showAlert: true,
  //     user: action.payload.user,
  //     targetUser: action.payload.targetUser,
  //     // alertType: "success",
  //     // alertText: "New Post Created",
  //   };
  // }
  // if (action.type === FOLLOW_USER_ERROR) {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     showAlert: true,
  //     alertType: "danger",
  //     alertText: action.payload.msg,
  //   };
  // }

  // if (action.type === GET_USER_BEGIN) {
  //   return { ...state, isLoading: true };
  // }
  // if (action.type === GET_USER_SUCCESS) {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     showAlert: true,
  //     targetUser: action.payload.targetUser,
  //   };
  // }
  // if (action.type === GET_USER_ERROR) {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     showAlert: true,
  //     alertType: "danger",
  //     alertText: action.payload.msg,
  //   };
  // }

  // if (action.type === GET_RECOMMEND_USER_BEGIN) {
  //   return { ...state, isLoading: true };
  // }
  // if (action.type === GET_RECOMMEND_USER_SUCCESS) {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     showAlert: true,

  //     recommendUser: action.payload.recommendUsers,
  //     // alertType: "success",
  //     // alertText: "New Post Created",
  //   };
  // }
  // if (action.type === GET_RECOMMEND_USER_ERROR) {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     showAlert: true,
  //     alertType: "danger",
  //     alertText: action.payload.msg,
  //   };
  // }

  // if (action.type === GET_REQUEST_USER_BEGIN) {
  //   return { ...state, isLoading: true };
  // }
  // if (action.type === GET_REQUEST_USER_SUCCESS) {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     showAlert: true,

  //     requestUser: action.payload.requestUserList,
  //   };
  // }
  // if (action.type === GET_REQUEST_USER_ERROR) {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     showAlert: true,
  //     alertType: "danger",
  //     alertText: action.payload.msg,
  //   };
  // }

  // if (action.type === ADD_COMMENT_BEGIN) {
  //   return { ...state, isLoading: true };
  // }
  // if (action.type === ADD_COMMENT_SUCCESS) {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     showAlert: true,
  //     posts: action.payload.posts,
  //     alertType: "success",
  //     alertText: "New Post Created",
  //   };
  // }
  // if (action.type === ADD_COMMENT_ERROR) {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     showAlert: true,
  //     alertType: "danger",
  //     alertText: action.payload.msg,
  //   };
  // }

  throw new Error(`no such action:${action.typw}`);
};

export default reducer;
