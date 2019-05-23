import { createStore, applyMiddleware } from "redux";
import reducer from "./reducer.js";

const customLog = (state) => (next) => (action) => {
	console.log("ACTION: ", action);
	next(action);
}

const store = createStore(reducer, {}, applyMiddleware(customLog));

export default store;
