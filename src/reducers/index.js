import { combineReducers } from "redux";
import auth from "./auth";
import userProfile from "./user-profile"

const appReducer = combineReducers({
  auth,
  userProfile
})

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    return appReducer(undefined, action)
  }

  return appReducer(state, action)
}

export default rootReducer;