import { combineReducers } from 'redux';
import player from './Useremail';
import gamer from './GameReducer';

const INITIAL_STATE = {};

const exampleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

const rootReducer = combineReducers({ exampleReducer, player, gamer });

export default rootReducer;
