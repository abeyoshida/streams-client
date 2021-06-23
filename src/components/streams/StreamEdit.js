import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id, formValues);
  };

  render() {
    console.log("StreamEdit this.props: ", this.props);

    if (!this.props.stream) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm
          /**
           * initialValues is a special prop that is added to a component that is
           * wrapped with reduxForm.  If you pass an object that contains key names
           * that correspond to the form element names they will automatically be
           * populated with the key values.  Here stream has keys for title and description.
           */
          initialValues={_.pick(this.props.stream, "title", "description")}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

/**
 * ownProps is the props object that is accessible in your component.
 */
const mapStateToProps = (state, ownProps) => {
  // console.log("mapStateToProps ownProps: ", ownProps);
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
