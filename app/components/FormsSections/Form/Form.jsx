import React from "react";
import PropTypes from "prop-types";

const Form = ({ fields }) => {
  return (
    <form>
      {fields.map((field, index) => (
        <div key={index}>
          <label htmlFor={field.name}>{field.label}</label>
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            value={field.value}
            onChange={field.onChange}
          />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

Form.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      value: PropTypes.string,
      onChange: PropTypes.func.isRequired,
    })
  ).isRequired,
};

export default Form;
