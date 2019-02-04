//Import the actions
import * as actions from './../actions/actions.js';

//Initial state of the pizza composition: nothing
const initialState = {

};


//And now, the reducer
const reducer = (state = initialState, action) => {
  //Keep the compiler happy
  let newValue = '';
  let newState = {};

  switch(action.type)
  {
    case actions.COMPOSITION_INITIALIZE:
      return {...action.payload};
    break;
    case actions.COMPOSITION_INCREMENT:
      newValue = state[action.payload.ingredient] + 1;
      newState = {...state};
      newState[action.payload.ingredient] = newValue;
      return newState;
    break;
      case actions.COMPOSITION_DECREMENT:
      newValue = state[action.payload.ingredient] - 1;
      newState = {...state};
      newState[action.payload.ingredient] = newValue;
      return newState;
    break;
  }

  //Redux asks us to return the initial state by default
  //And since all are return statements, no problem
  return state;
};

export default reducer;
