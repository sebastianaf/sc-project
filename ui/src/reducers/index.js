const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_MODAL_OPTIONS":
      return {
        ...state,
        modalOptions: action.payload,
      };
    case "SET_MODAL_OPEN":
      return {
        ...state,
        modalOpen: action.payload,
      };
    case "SET_OPEN":
      return {
        ...state,
        open: action.payload,
      };
    case "SET_SIDEBAR":
      return {
        ...state,
        sidebar: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
