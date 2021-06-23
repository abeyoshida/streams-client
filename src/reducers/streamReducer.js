import _ from "lodash";
import {
  FETCH_STREAM,
  FETCH_STREAMS,
  CREATE_STREAM,
  EDIT_STREAM,
  DELETE_STREAM,
} from "../actions/types";

const streamReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAMS:
      /** _.mapKeys is a lodash method that transforms an array into an object.
       *  It takes 2 arguments: 1) an array, 2) string property.  It returns an
       *  object with keys from a property of the array item that is being iterated on.
       *  Here action.payload is an array of object which is transformed into an object
       *  with keys created with the id property value and the object as the value.
       */
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_STREAM:
      /** _.omit() is a lodash method that accepts 2 arguments: object, object to omit.
       *  It returns a new object.  Here a new state object is returned without action.payload.
       */
      return _.omit(state, action.payload);

    default:
      return state;
  }
};

export default streamReducer;
