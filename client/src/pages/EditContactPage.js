import React, { Component } from 'react';
import EditUserForm from '../containers/user_form/EditUserForm';

class EditContactPage extends Component {
	constructor(props) {
		super(props);

		this.onSubmitCallback = this.onSubmitCallback.bind(this);
	}

    onSubmitCallback(){
        this.props.history.push('/');
    }

	render() {
		const { id } = this.props.match.params;

		return (
			<div className="section">
				<EditUserForm id={id} onSubmitCallback={this.onSubmitCallback} />
			</div>
		);
	}
}

export default EditContactPage;
