import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function Header() {
	return (
		<Navbar bg="black" variant="dark" fixed="top">
			<LinkContainer to="/">
				<Navbar.Brand>
					<div className="AppBrand">
						<img
							src="/favicon.ico"
							alt="AppBrand"
							className="d-inline-block mr-2"
							width="30"
							height="30"
						/>
						<span>Auth</span>
					</div>
				</Navbar.Brand>
			</LinkContainer>
			<Nav className="mr-auto">
				<LinkContainer exact to="/">
					<Nav.Link>Home</Nav.Link>
				</LinkContainer>
			</Nav>
		</Navbar>
	);
}

export default Header;
