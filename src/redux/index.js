import { composeWithDevTools } from '@redux-devtools/extension';
import { legacy_createStore as createStore } from 'redux';
import rootReducer from './reducers/rootReducer';

const store = createStore(rootReducer, composeWithDevTools());

export default store;
