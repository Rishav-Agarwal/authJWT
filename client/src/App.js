import React from 'react';
import jwtDecode from 'jwt-decode';

import './App.css';

import Header from './components/header';
import MainContent from './components/main';
import store from './store';
import { successfulLogin } from './actions';

if (localStorage.getItem('x-auth-token')) {
	const payload = jwtDecode(localStorage.getItem('x-auth-token'));
	store.dispatch(successfulLogin(payload.data));
}

function App() {
	return (
		<div className="App">
			<Header />
			<MainContent />
		</div>
	);
}

export default App;
