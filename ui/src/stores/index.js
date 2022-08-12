//Redux
import { createStore } from "redux";
import reducer from "../reducers";
import app from "../config/app";

const initialState = {
  app,
  user: null,
  open: true,
  modalOpen: false,
  sidebar: false,
  loading: false,
  modalOptions: {
    title: "",
    description: "",
    error: false,
  },
};

export const store = createStore(reducer, initialState);
