import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import {
  fetchContacts,
  set_filter_term,
  set_filter_page,
  delete_contact
} from "../actions";

import Alpha from "../components/alphabetMenu";
import RecordsListItem from "../components/recordsListItem";
import Paging from "../containers/paging";
import SearchBox from "../containers/SearchBox";

class RecordsList extends Component {
  constructor(props) {
    super(props);

    this.onClickAlpha = this.onClickAlpha.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
  }

  componentDidMount() {
    //Fetch contacts from DB
    this.props.fetchContacts(this.props.filter);
  }

  //UPDATERS
  componentWillReceiveProps(nextProps) {
    // Runs Every time when filter or pager is changed
    // Re-fetch contacts when filter is changed
    if (this.props.filter !== nextProps.filter) {
      this.props.fetchContacts(nextProps.filter);
    }
  }

  onClickAlpha(letter, e) {
    //Update filter in store
    this.props.set_filter_term({ term: letter, type: "alpha" });
    this.props.set_filter_page(1);
  }

  deleteContact(id) {
    this.props.delete_contact(id, () => {
      this.props.fetchContacts(this.props.filter);
    });
  }

  renderContacts() {
    if (this.props.contacts.data) {
      if (this.props.contacts.data.length === 0) {
        return (
          <tr>
            <td className="center" colSpan="8">
              No records to show
            </td>
          </tr>
        );
      }

      return this.props.contacts.data.map(contact => {
       //console.log(contact, 'contact');
       return (
          <RecordsListItem
            deleteContact={this.deleteContact}
            key={contact._id}
            contact={contact}
          />
        );
      });
    }
  }

  render() {
    return (
      <div>
        <div className="row">
          <SearchBox />
        </div>

        <Alpha
          set_filter_term={this.onClickAlpha}
          active_term={this.props.filter.term}
        />

        <div className="card ">
          <table className="bordered striped highlight  ">
            <thead className="teal lighten-1 white-text ">
              <tr>
                <th>Avatar</th>
                <th>Name</th>
                <th>Company Name</th>
                <th>Work Phone</th>
                <th>Mobile Phone</th>
                <th>Category</th>
                <th style={{ width: "10%" }}>Notes</th>
                <th tyle={{ width: "35px" }}>Modify</th>
              </tr>
            </thead>

            <tbody>{this.renderContacts()}</tbody>
          </table>
        </div>

        <Paging total_records={this.props.contacts.total_records} />
      </div>
    );
  }
}

RecordsList.propTypes = {
  contacts: PropTypes.shape({
    data: PropTypes.array,
    total: PropTypes.number
  })
};

function mapStateToProps(state) {
  return {
    contacts: state.contacts,
    filter: state.filter
  };
}

export default connect(mapStateToProps, {
  fetchContacts,
  set_filter_term,
  set_filter_page,
  delete_contact
})(RecordsList);
