import React, { Component } from 'react';

//Redux
import { connect } from 'react-redux';
import { set_filter_term, reset_filter, reset_pager } from '../actions';

class SearchBox extends Component {
	constructor(props) {
		super(props);

		this.keyUpHandler = this.keyUpHandler.bind(this);
	}

	keyUpHandler(term) {
		//reset Pager  each time when term is changed
		this.props.reset_pager();

		if (term.length > 0) {
			this.props.set_filter_term({ term: term, type: 'search' });
		} else {
			//Set to default if searchbox is cleaned
			console.warn('reset_filter()');
			this.props.reset_filter();
		}
	}

	//UPDATERS
	componentWillReceiveProps(nextProps) {
		console.log(nextProps, 'componentWillReceiveProps');

		//clean up search input if filter type was changed
		if (nextProps.filter.type !== 'search') {
			this.search_input.value = '';
		} else {
		}
	}

	render() {
		return (
			<div className="fake-input right">
				<div className="label-icon" htmlFor="search">
					<i className="material-icons small teal-text">search</i>
				</div>

				<input
					type="search"
					ref={node => {
						this.search_input = node;
					}}
					className="search-input"
					placeholder="Who to find?"
					onKeyUp={el => this.keyUpHandler(el.target.value)}
				/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		filter: state.filter
	};
}

export default connect(mapStateToProps, { set_filter_term, reset_filter, reset_pager })(SearchBox);
