import {
  login,
  loginFailed,
  loginSuccess,
  register,
  registerSuccess,
  registerFailed,
} from "../redux/authSlice";
import { take, call, put, fork, all } from "redux-saga/effects";
import apiModule from '../http'

const {loginApi, registerApi} = apiModule()

function* loginSaga(payload) {
  try {
    const { data } = yield call(loginApi, payload);
    if (data) yield put(loginSuccess(data));
  } catch (error) {
    yield put(loginFailed(error.response.data.error.message));
  }
}

function* registerSaga(payload) {
  try {
    const { data } = yield call(registerApi, payload);
    if (data) yield put(registerSuccess(data.success));
  } catch (error) {
    yield put(registerFailed(error.response.data.error.message));
  }
}

function* watcherLogin() {
  while (true) {
    const { payload } = yield take(login);
    yield fork(loginSaga, payload);
  }
}
function* watcherRegister() {
  while (true) {
    const { payload } = yield take(register);
    console.log(payload)
    yield fork(registerSaga, payload);
  }
}

export default function* () {
  yield all([watcherLogin(), watcherRegister()]);
}
