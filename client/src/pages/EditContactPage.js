import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import validateEmails from "../utils/validateEmails";
import _ from 'lodash';

// Redux
import { connect } from "react-redux";
import { saveContact, fetchContact } from "../actions";

import formFields from "../containers/user_form/formFields";
import formFieldsTempl from "../containers/user_form/formFieldTempl";

class EditContactForm extends Component {
  componentWillMount() {
    const { id } = this.props.match.params;
    this.props.fetchContact(id);
  }

  formSubmit(values) {
    this.props.saveContact(values, () => {
      this.props.history.push("/");
    });
  }

  renderFields(array = []) {
    return array.map(field => {
      return (
        <Field
          key={field.name}
          name={field.name}
          component={formFieldsTempl}
          label={field.label}
          type={field.type ? field.type : "text"}
        />
      );
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="section">
        <form onSubmit={handleSubmit(this.formSubmit.bind(this))}>
          <div className="row">
            <div className="col s6"> {this.renderFields(formFields.pers)}</div>
            <div className="col s6">
              {this.renderFields(formFields.address)}
            </div>
          </div>

          <br />
          <div className="row">
            <div className="col s12">
              {this.renderFields(formFields.contact)}
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              {" "}
              {this.renderFields(formFields.other)}
            </div>
          </div>

          <Link to="/" className="red btn-flat white-text">
            Cansel
          </Link>

          <button type="submit" className="teal btn-flat right white-text">
            Save
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ selected_contact }) {
  return {
    initialValues: selected_contact
  };
}

function validate(values) {
  const errors = {};

  let all_fields = [].concat(formFields.pers, formFields.contact);
  let required_fields = all_fields.filter(elem => {
    return elem.reguired === true;
  });

  _.each(required_fields, ({ name }) => {
    if (!values[name]) {
      errors[name] = "You must provide a value";
    }
  });

  errors.Email = validateEmails(values.Email || "");
  return errors;
}

export default connect(mapStateToProps, { fetchContact, saveContact })(
  reduxForm({
    form: "ContactForm",
    validate: validate,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true
  })(EditContactForm)
);