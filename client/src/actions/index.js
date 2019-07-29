import axios from 'axios';

import * as Types from './types';

export const successfulLogin = data => {
	axios.defaults.headers['x-auth-token'] = localStorage.getItem('x-auth-token');

	return {
		type: Types.LOGIN_SUCCESS,
		payload: data
	};
};

export const authError = data => {
	return {
		type: Types.AUTH_ERROR,
		payload: data
	};
};

export const register = (username, pass) => {
	return (dispatch, getState) => {
		axios
			.post('/api/users/register', { username, pass })
			.then(response => {
				localStorage.setItem('x-auth-token', response.headers['x-auth-token']);

				axios.defaults.headers['x-auth-token'] =
					response.headers['x-auth-token'];

				dispatch(successfulLogin(response.data));
			})
			.catch(err => {
				if (err.response) {
					if (err.response.status === 400)
						dispatch(authError(err.response.data));
					else dispatch(authError({ user: err.response.data.message }));
				} else console.log('No response');
			});
	};
};

export const logout = () => {
	if (localStorage.getItem('x-auth-token'))
		localStorage.removeItem('x-auth-token');

	axios.defaults.headers['x-auth-token'] = null;

	return {
		type: Types.LOGOUT
	};
};

export const login = (username, pass) => {
	return function(dispatch, getState) {
		axios
			.post('/api/users/login', { username, pass })
			.then(response => {
				localStorage.setItem('x-auth-token', response.headers['x-auth-token']);

				axios.defaults.headers['x-auth-token'] =
					response.headers['x-auth-token'];

				dispatch(successfulLogin(response.data));
			})
			.catch(err => {
				if (err.response) {
					if (err.response.status === 400)
						dispatch(authError(err.response.data));
					else console.log(err.response);
				} else console.log('no response in error(axios)');
			});
	};
};

export const updateError = error => {
	return {
		type: Types.UPDATE_ERROR,
		payload: error
	};
};
