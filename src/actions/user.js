import { USERPROFILE_FETCHING, USERPROFILE_FAILED, USERPROFILE_SUCCESS } from "./types";

import UserService from "../services/user.service";

export const getUserProfile = (id) => async (dispatch) => {
  try {
    const res = await UserService.getUserProfile(id);
    if (res) {
      dispatch({
        type: USERPROFILE_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: USERPROFILE_FAILED,
    });
    console.log(err);
  }
};
