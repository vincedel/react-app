import { createStore } from 'redux';
import sessionStore from './SessionStore';

const store = createStore(sessionStore, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;