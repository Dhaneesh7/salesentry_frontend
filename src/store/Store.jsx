import salesReducer from './salesReducer';
import { createStore } from 'redux';
const store = createStore(salesReducer);
export default store;
