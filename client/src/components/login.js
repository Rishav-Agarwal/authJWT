import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import { login } from '../actions';

class Login extends Component {
	onLogin = () => {
		this.props.login(this.refs.username.value, this.refs.pass.value);
	};

	render() {
		return (
			<Form>
				<Form.Group controlId="loginUsername">
					<Form.Label>Username</Form.Label>
					<Form.Control
						type="username"
						placeholder="Enter username (e.g. MrRedible)"
						ref="username"
					/>
				</Form.Group>

				<Form.Group controlId="loginPass">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" ref="pass" />
				</Form.Group>

				<Button
					variant="dark"
					type="submit"
					onClick={e => {
						e.preventDefault();
						this.onLogin();
					}}
				>
					Submit
				</Button>
			</Form>
		);
	}
}

const mapStateToProps = state => {
	return {
		auth: state.auth
	};
};

export default connect(
	mapStateToProps,
	{ login }
)(Login);
