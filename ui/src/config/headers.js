const headers = {
  "content-type": "application/json",
  charset: "utf-8",
  token: `${localStorage.getItem("token")}`,
};

export default headers;
