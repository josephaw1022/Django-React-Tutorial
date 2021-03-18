import { TO_DO } from "../Actions/todoActions";

// null is set as the default value here for state, because Redux will complain if state is undefined.
// You can set initial state here, but it is recommended on the Redux documentation to preload the state within the redux store.
// https://redux.js.org/recipes/structuring-reducers/initializing-state
export default function todoRedcuer(state = null, action) {
  switch (action.type) {
    case TO_DO:
      return action.payload.ToDoList;
    default:
      return state;
  }
}
