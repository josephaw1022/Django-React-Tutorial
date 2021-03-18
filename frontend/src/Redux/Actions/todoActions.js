export const TO_DO = "TO_DO";

// The function, submitValue, is an 'action creator'
// The return value is an 'action'
export function todoAction(value) {
  
  return {
    type: TO_DO,
    payload: {
       ToDoList: value,
    },
  };
}
