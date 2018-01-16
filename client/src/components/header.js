import React, { Component } from 'react';
import CreateUserModal from './createUserModal';
import { Navbar } from 'react-materialize';

class Header extends Component {
	render() {
		return (
			<Navbar brand="Phonebook" right href={process.env.BASENAME}>
				<li>
					<CreateUserModal />
				</li>
			</Navbar>
		);
	}
}

export default Header;
