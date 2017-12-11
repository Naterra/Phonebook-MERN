import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-materialize';

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
    const header_text = `Do you want to delete ${contact.name}  ?`;
    return (
      <tr>
        <td>{contact.name}</td>
        <td>{contact.company_name}</td>
        <td>{contact.work_phone}</td>
        <td>{contact.cell_phone}</td>
        <td>{contact.category}</td>
        <td>{contact.notes}</td>
        <td className="center-align">
          <Link to={`/edit_contact/${contact._id}`} className="teal lighten-2 waves-effect waves-light btn btn-small ">
            <i className="material-icons ">create</i>
          </Link>

          <Modal
            header={header_text}
            actions={
              <div>
                <Button flat className="modal-action modal-close " waves="light" onClick={e => this.deleteEvent(contact._id)}>
                  Yes
                </Button>

                <Button className="modal-action modal-close " flat modal="close" waves="light">
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
