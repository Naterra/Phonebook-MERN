import React, { Component } from 'react';

//Redux
import { connect } from 'react-redux';
import { set_filter_page } from '../actions';

import _ from 'lodash';

class Paging extends Component {
	constructor(props) {
		super(props);

		this.state = {
			pages: [],
			total_pages: 0
		};

		this.pagingOnClick = this.pagingOnClick.bind(this);
		this.goToFirst = this.goToFirst.bind(this);
		this.goToLast = this.goToLast.bind(this);
	}

	componentWillReceiveProps(nextProps) {
	  console.log(nextProps, 'componentWillReceiveProps');
		this.getPager(nextProps);
	}

	pagingOnClick(el, e) {
		this.props.set_filter_page(el);
	}

	goToFirst(e) {
		this.props.set_filter_page(1);
	}

	goToLast(e) {

		this.props.set_filter_page(this.state.total_pages);
        console.log(this.state, 'goToLast');
	}

	getPager(param) {
		let currentPage = parseInt(param.filter.page);
		let visiblePages = parseInt(param.visiblePages, 10) || 10;

		// calculate total pages
		let totalPages = Math.ceil(param.total_records / param.filter.limit);
		this.setState({ total_pages: totalPages });

		let page_offset = parseInt(Math.ceil(visiblePages / 2), 10);

		let startPage, endPage;

		//if on begining and less then in half of way
		if (currentPage   <= page_offset) {
		  console.log('begining');
			startPage = 1;
			endPage = totalPages>visiblePages ? visiblePages : totalPages;
		}
		// If on the end of list
        else if (currentPage + page_offset >= totalPages) {
            console.log('nearby END');
			//if close to end
			startPage = totalPages - visiblePages+1;
			endPage = totalPages;
		} else {
            console.log('REGULAR PAGING');
			startPage = currentPage - page_offset + 1;
			endPage = currentPage + page_offset;
		}

        console.warn('Total_records:'+param.total_records+' totalPages:'+totalPages+' currentPage:'+currentPage+' page_offset:'+page_offset );



		let pages = _.range(parseInt(startPage, 10), parseInt(endPage, 10) + 1);

		this.setState({
			pages: pages
		});
	}

	getList() {
		return this.state.pages.map(page => {
			return (
				<li
					key={page}
					onClick={e => this.pagingOnClick(page, e)}
					className={page === this.props.filter.page ? 'active' : 'waves-effect'}
				>
					<a>{page}</a>
				</li>
			);
		});
	}

	last_arrow() {
		//show arrow if more than one page existing in result
		if (this.state.pages.length > 0) {
			let style = this.props.filter.page === this.state.total_pages ? 'disabled' : 'waves-effect';

			return (
				<li className={style}>
					<a onClick={e => this.goToLast(e)}>
						<i className="material-icons">chevron_right</i>
					</a>
				</li>
			);
		}
	}

	first_arrow() {
		if (this.state.pages.length > 0) {
			let style = this.props.filter.page === 1 ? 'disabled' : 'waves-effect';

			return (
				<li className={style}>
					<a onClick={e => this.goToFirst(e)}>
						<i className="material-icons">chevron_left</i>
					</a>
				</li>
			);
		}
	}

	render() {
		return (
			<ul className="pagination center">
				{this.first_arrow()}
				{this.getList()}
				{this.last_arrow()}
			</ul>
		);
	}
}

function mapStateToProps(state) {
	return {
		filter: state.filter
	};
}

export default connect(mapStateToProps, { set_filter_page })(Paging);
