import React, { useReducer, useContext } from "react";
import {
  LOGOUT_USER,
  CLEAR_VALUES,
  BEGIN,
  SUCCESS,
  ERROR,
} from "../context/actions.js";

import reducer from "../context/reducers";
import axios from "axios";
import { useAppContext } from "../context/appContext.js";

const ApiPost = () => {
  const { initialState } = useAppContext();

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
        // logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const [state, dispatch] = useReducer(reducer, initialState);

  const getExplorePosts = async () => {
    dispatch({
      type: BEGIN,
      payload: {
        isPostLoading: true,
      },
    });

    try {
      const {
        data: { posts },
      } = await authFetch.get("/post");
      console.log(posts);
      dispatch({
        type: SUCCESS,
        payload: {
          posts: posts,
          isPostLoading: false,
        },
      });
    } catch (error) {
      console.log(error);
      // logoutUser();
    }
    // clearAlert();
  };

  return {
    getExplorePosts,
  };
};
export default ApiPost;
