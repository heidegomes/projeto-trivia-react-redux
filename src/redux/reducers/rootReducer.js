import { combineReducers } from 'redux';
import user from './Useremail';

const INITIAL_STATE = {};

const exampleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

const rootReducer = combineReducers({ exampleReducer, user });

export default rootReducer;
