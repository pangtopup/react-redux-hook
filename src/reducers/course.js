import { COURSE_FETCHING, COURSE_FAILED, COURSE_SUCCESS } from "../actions/types";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case COURSE_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case COURSE_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    case COURSE_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };
    default:
      return state;
  }
};
