import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component {
  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };

  // renderInput(formProps) {
  // return (
  //   <input
  //     onChange={formProps.input.onChange}
  //     value={formProps.input.value}
  //   />
  // );
  // }

  /**
   * We can re-write the above renderInput function by first destructuring formProps to input.
   * Then we can pass all the destructured input properties as props to the input element by
   * using curly braces and the spread operator for the input object.
   */
  renderInput = ({ input, label, meta }) => {
    // console.log("renderInput meta: ", meta);
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  /**
   * This onSubmit handler is the argument to this.props.handleSubmit() that is injected into this
   * component by reduxForm()() function that we wrap our component with.  Instead of the event
   * object it gets passed the form values.
   * @param {*} formValues
   */
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    console.log("StreamForm this.props: ", this.props);
    return (
      <form
        className="ui form error"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        {/**
         * The Field component takes a name prop that names or identifies
         * the value in the Redux store.
         */}
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

/**
 * In order to validate the form we need to create a validate function which will receive
 * a formValues object made of the Field names that we created.  Then we check the fields
 * to see if they are valid.  If not then we add an error message to the erros object and
 * return it at the end.  If it is empty then Redux Form assumes that the form is OK.
 * @param {*} formValues
 * @returns
 */
const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "You must enter a title";
  }

  if (!formValues.description) {
    errors.description = "You must enter a description";
  }

  return errors;
};

/**
 * reduxForm fulfills a similar role and uses a similar syntax as the
 * Redux connect()() function in order to wire up the component to redux-form.
 * It takes a single object as the argument to the first call with a key named
 * "form" and the name of the form as it's value.  ReduxForm automatically sends
 * into the component a large number of props that we will use to wire up our form elements.
 *
 */
export default reduxForm({
  form: "streamForm",
  validate,
})(StreamForm);
