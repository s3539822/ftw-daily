import pick from 'lodash/pick';
import { types as sdkTypes } from '../../util/sdkLoader';
import { storableError } from '../../util/errors';
import { sendInternalEmail } from '../../util/api';

const { UUID } = sdkTypes;

// ================ Action types ================ //

export const SET_INITIAL_VALUES = 'app/ContactPage/SET_INITIAL_VALUES';

export const SEND_MESSAGE_REQUEST = 'app/ContactPage/SEND_MESSAGE_REQUEST';
export const SEND_MESSAGE_SUCCESS = 'app/ContactPage/SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_ERROR = 'app/ContactPage/SEND_MESSAGE_ERROR';

// ================ Reducer ================ //

const initialState = {
  sendMessageInProgress: false,
  sendMessageSuccess: false,
  sendMessageError: null,
};

const contactPageReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case SET_INITIAL_VALUES:
      return { ...initialState, ...payload };

    case SEND_MESSAGE_REQUEST:
      return { ...state, sendMessageInProgress: true, sendMessageSuccess: false, sendMessageError: null };
    case SEND_MESSAGE_SUCCESS:
      return { ...state, sendMessageInProgress: false, sendMessageSuccess: true };
    case SEND_MESSAGE_ERROR:
      return { ...state, sendMessageInProgress: false, sendMessageSuccess: false, sendMessageError: payload };

    default:
      return state;
  }
};

export default contactPageReducer;

// ================ Action creators ================ //

export const setInitialValues = initialValues => ({
  type: SET_INITIAL_VALUES,
  payload: pick(initialValues, Object.keys(initialState)),
});

export const sendMessageRequest = () => ({ type: SEND_MESSAGE_REQUEST });
export const sendMessageSuccess = () => ({ type: SEND_MESSAGE_SUCCESS });
export const sendMessageError = e => ({ type: SEND_MESSAGE_ERROR, error: true, payload: e });

// ================ Thunks ================ //

export const sendMessage = (values) => (dispatch) => {
  dispatch(sendMessageRequest());
  return sendInternalEmail(values)
    .then(value => {
      dispatch(sendMessageSuccess());
    })
    .catch(e => {
      dispatch(sendMessageError(storableError(e)));
      throw e;
    });
};
