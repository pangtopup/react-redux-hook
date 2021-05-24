import { httpClient } from "./httpClient";

const getAllCourses = () => {
  return httpClient.get("courses");
};

export default {
    getAllCourses,
};
