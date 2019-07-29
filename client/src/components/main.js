import React, { Component } from 'react';
import { Tabs, Tab, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import SignUp from './sign-up';
import Login from './login';

import { logout, updateError } from '../actions';

class MainContent extends Component {
	render() {
		const { isAuthenticated, error } = this.props.auth;

		return (
			<div className="d-flex flex-column h-100 justify-content-center align-items-center">
				{isAuthenticated && (
					<>
						<h1>Logged in</h1>
						<Button variant="danger" onClick={() => this.props.logout()}>
							Logout
						</Button>
					</>
				)}
				{!isAuthenticated && (
					<div
						style={{
							border: '1px solid lightgrey',
							borderRadius: '4px',
							boxShadow: '1px 0 3px 0 grey'
						}}
					>
						<Tabs
							defaultActiveKey="signup"
							id="auth"
							onSelect={tab => this.props.updateError({})}
						>
							<Tab
								eventKey="signup"
								title="Sign up"
								style={{ padding: '32px' }}
							>
								<SignUp />
							</Tab>
							<Tab eventKey="login" title="Log in" style={{ padding: '32px' }}>
								<Login />
							</Tab>
						</Tabs>
					</div>
				)}
				{error && (
					<div style={{ color: 'red' }}>
						<p> {error.user} </p>
						<p> {error.pass} </p>
					</div>
				)}
			</div>
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
	{ logout, updateError }
)(MainContent);
