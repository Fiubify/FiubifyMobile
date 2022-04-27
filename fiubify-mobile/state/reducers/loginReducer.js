import { LOG_IN, LOG_OUT } from '../constants.js'

const initialState = {
  logged_in: false
};


const loginReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOG_IN:
      return {...state, logged_in: true}
    case LOG_OUT:
      return {...state, logged_in: false}
    default:
      return state
  }
}

export default loginReducer
