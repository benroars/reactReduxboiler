import 'isomorphic-fetch';
import * as actionTypes from '../constants/actionTypes';

import { ID_TOKEN,
        callApi,
        setIdToken,
        removeIdToken,
        decodeUserProfile } from '../utils/utils';

function loginRequest(user) {
  return {
    type: actionTypes.LOGIN_REQUEST,
    user,
  };
}

function loginSuccess(payload) {
  const idToken = payload[ID_TOKEN];
  setIdToken(idToken);
  const profile = decodeUserProfile(idToken);
  return {
    type: actionTypes.LOGIN_SUCCESS,
    user: profile.user,
    role: profile.role,
  };
}

function loginFailure(error) {
  removeIdToken();
  return {
    type: actionTypes.LOGIN_FAILURE,
    error,
  };
}

export function login(user, password) {
  const config = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user,
      password,
    }),
  };

  return callApi('/api/login', config, loginRequest(user), loginSuccess, loginFailure);
}


// //////////////////////////////////////////////////
// LOGOUT REQUESTS
// //////////////////////////////////////////////////

function logoutRequest(user) {
  removeIdToken();
  return {
    type: actionTypes.LOGOUT_REQUEST,
    user,
  };
}

function logoutSuccess(user) {
  removeIdToken();
  return {
    type: actionTypes.LOGOUT_SUCCESS,
    user,
  };
}

function logoutFailure(user, error) {
  return {
    type: actionTypes.LOGOUT_FAILURE,
    user,
    error,
  };
}

export function logout(user) {
  const config = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user,
    }),
  };

  return callApi('/api/logout', config, logoutRequest, logoutSuccess, logoutSuccess);
}
