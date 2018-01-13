import React, { Component } from "react";
import _ from 'lodash';
import validateEmails from "../../utils/validateEmails";
// Redux
import { connect } from "react-redux";
import { saveContact, fetchContact, fetchContacts } from "../../actions";
import { Field, reduxForm } from "redux-form";

// Fields
import formFields from "./formFields";
import formFieldsTempl from "./formFieldTempl";

class UserForm extends Component {
  formSubmit(values) {
    this.props.saveContact(values, () => {
      this.props.userCreatedCallback(values);

      // re-fetch records
        console.log('re-fetch contacts', this.props.filter);
       this.props.fetchContacts(this.props.filter);
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
  renderContent() {
    const { handleSubmit } = this.props;

    return (
      <div className="row">
        <form
          className="col s12"
          onSubmit={handleSubmit(this.formSubmit.bind(this))}
        >
          <div className="row">
            <div className="col s6"> {this.renderFields(formFields.pers)}</div>
            <div className="col s6">
              {this.renderFields(formFields.address)}
            </div>
          </div>

          <br />
          <div className="row">
            <div className="col s12">
              {" "}
              {this.renderFields(formFields.contact)}
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              {" "}
              {this.renderFields(formFields.other)}
            </div>
          </div>

          <button type="submit" className="teal btn-flat right white-text">
            Save
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

function mapStateToProps(state) {
  return {
    filter: state.filter,
    initialValues: state.selected_contact
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

export default connect(mapStateToProps, { fetchContact, fetchContacts, saveContact })(
  reduxForm({
    form: "NewUserForm",
    validate: validate,
    enableReinitialize: false,
    keepDirtyOnReinitialize: false
  })(UserForm)
);
