import { createStore } from 'redux';
import sessionStore from './SessionStore';

const store = createStore(sessionStore);

export default store;