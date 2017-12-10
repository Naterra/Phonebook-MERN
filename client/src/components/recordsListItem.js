import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal, Button  } from "react-materialize";

class recordsListItem extends Component {
  constructor(props) {
    super(props);

    this.deleteEvent = this.deleteEvent.bind(this);
  }

  deleteEvent(id) {
    this.props.deleteContact(id);
    // Close Modal
    //$(".modal.open").modal("close");
  }

  render() {
    const { contact } = this.props;
    const header_text = `Do you want to delete ${contact.FirstName} ${
      contact.LastName
    } ?`;
    return (
      <tr>
        <td>{contact.FirstName + " " + contact.LastName}</td>
        <td>{contact.CompanyName}</td>
        <td>{contact.OfficeNo}</td>
        <td>{contact.MobileNo}</td>
        <td>{contact.Category}</td>
        <td>{contact.Notes}</td>
        <td className="center-align">
          <Link
            to={`/edit_contact/${contact.Id}`}
            className="teal lighten-2 waves-effect waves-light btn btn-small "
          >
            <i className="material-icons ">create</i>
          </Link>

          <Modal
            header={header_text}
            actions={
              <div>
                <Button
                  flat
                  className="modal-action modal-close "
                  waves="light"
                  onClick={e => this.deleteEvent(contact.Id)}
                >
                  Yes
                </Button>

                <Button
                  className="modal-action modal-close "
                  flat
                  modal="close"
                  waves="light"
                >
                  No
                </Button>
              </div>
            }
            trigger={
              <Button className="red lighten-2  btn-small" waves="light">
                <i className="material-icons ">delete</i>
              </Button>
            }
          />
        </td>
      </tr>
    );
  }
}

export default recordsListItem;
