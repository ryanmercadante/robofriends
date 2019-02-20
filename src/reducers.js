import { CHANGE_SEARCH_FIELD } from "./constants";

const initialState = {
  searchField: ""
};

// reducer - gets input of state and action
// if we receive an action that has anything to do with searching robots, were going to act upon the state
export const searchRobots = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_SEARCH_FIELD:
      // Returning a new state with Object.assign thats going to have everything in the state, plus we're going to update whatever new searchField property we have with action.payload
      return Object.assign({}, state, { searchField: action.payload });
    default:
      return state;
  }
};
