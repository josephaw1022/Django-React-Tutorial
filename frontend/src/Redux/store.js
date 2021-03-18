import { createStore, combineReducers } from "redux";
import todoRedcuer from "./Reducers/todoReducers";

const allReducers = combineReducers({
  ToDoList: todoRedcuer
});

export const initalState = {
  ToDoList : null 
};

export const store = createStore(allReducers, initalState);
