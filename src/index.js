import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import { Provider } from "react-redux";
import store from "./store";

import { Route, BrowserRouter as Router } from "react-router-dom";

import Main from "./containers/main";
import Home from "./containers/home";
import AddMeeting from "./containers/addMeeting";

ReactDOM.render((
	<Provider store={store}>
		<Router>
		    <Main/>
			<div className="container">
			  <Route exact path="/" component={Home} />
			  <Route path="/home" component={Home} />
			  <Route path="/add-meeting" component={AddMeeting} />
			</div>
		</Router>
	</Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


