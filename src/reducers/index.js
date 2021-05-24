import { combineReducers } from "redux";
import auth from "./auth";
import userProfile from "./user-profile";
import course from "./course"

const appReducer = combineReducers({
  auth,
  userProfile,
  course
})

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    return appReducer(undefined, action)
  }

  return appReducer(state, action)
}

export default rootReducer;