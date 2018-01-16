import React, { Component } from 'react';
import { Modal } from 'react-materialize';
import UserForm from '../containers/user_form/UserForm';

class createUserModal extends Component {
	constructor(props) {
		super(props);

		this.default_param = {
			user_created: false,
			modal_header: 'Add New Contact'
		};

		this.state = this.default_param;

		this.setToDefault = this.setToDefault.bind(this);
		this.userCreatedCallback = this.userCreatedCallback.bind(this);
	}

	setToDefault() {
		// Set state to default
		this.setState(this.default_param);
	}

	userCreatedCallback(val) {
		this.setState({ user_created: true, modal_header: '' });
	}

	render() {
		return (
			<Modal
				header={this.state.modal_header}
				modalOptions={{
					complete: () => {
						this.setToDefault();
					},
					ready: (modal, trigger) => {
						this.setToDefault();
					}
				}}
				trigger={<a>Add New Contact</a>}
			>
				{this.state.user_created === false && <UserForm show_empty="true" userCreatedCallback={this.userCreatedCallback} />}
				{this.state.user_created === true && <h5 className="center teal-text"> New contact was created</h5>}
			</Modal>
		);
	}
}

export default createUserModal;
