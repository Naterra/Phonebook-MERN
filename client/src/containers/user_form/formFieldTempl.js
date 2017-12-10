import React from "react";

export default ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    {/*<label>{label}</label>*/}

    <div className="red-text" style={{ marginBottom: "5px" }}>
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
    <input {...input} placeholder={label} />
  </div>
);
