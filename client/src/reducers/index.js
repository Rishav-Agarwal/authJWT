import { combineReducers } from 'redux';

import * as Types from '../actions/types';

const stateStructure = {
	isAuthenticated: false,
	username: null,
	error: {}
};

const auth = (prvState = stateStructure, action) => {
	if (action.type === Types.AUTH_ERROR) {
		return {
			isAuthenticated: false,
			error: action.payload,
			username: null
		};
	} else if (action.type === Types.LOGIN_SUCCESS) {
		return {
			isAuthenticated: true,
			error: {},
			username: action.payload.username
		};
	} else if (action.type === Types.LOGOUT) {
		return { isAuthenticated: false, error: {}, username: null };
	} else if (action.type === Types.UPDATE_ERROR) {
		return {
			isAuthenticated: prvState.isAuthenticated,
			error: action.payload,
			username: prvState.username
		};
	} else return prvState;
};

export default combineReducers({
	auth
});
