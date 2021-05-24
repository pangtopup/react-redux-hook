import { httpClient } from "./httpClient";

const getUserProfile = (id) => {
  return httpClient.get("user/profile/" + id);
};

export default {
  getUserProfile,
};
