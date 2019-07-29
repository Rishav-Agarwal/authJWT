import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import { register } from '../actions';

class SignUp extends Component {
	onSignup = e => {
		this.props.register(this.refs.username.value, this.refs.pass.value);
	};

	render() {
		return (
			<Form>
				<Form.Group controlId="signupUsername">
					<Form.Label>Username</Form.Label>
					<Form.Control
						type="username"
						placeholder="Enter username (e.g. MrRedible)"
						ref="username"
					/>
					<Form.Text className="text-muted">
						This should be unique to you.
					</Form.Text>
				</Form.Group>

				<Form.Group controlId="signupPass">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" ref="pass" />
				</Form.Group>

				<Button
					variant="dark"
					type="submit"
					onClick={e => {
						e.preventDefault();
						this.onSignup();
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
	{ register }
)(SignUp);
