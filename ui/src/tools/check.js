import headers from "../config/headers";
import api from "../config/api";

const check = async () => {
  try {
    var req = {
      headers,
      method: "POST",
    };
    const res = await fetch(`${api.host}/api/users/check`, req);
    const data = await res.json();
    
    if (data.alias) {
      return data;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export default check;
