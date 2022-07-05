import {
    createOrder,
    createOrderFailed,
    createOrderSuccess,
    getOrderID,
    getOrderIDfailed,
    getOrderIDsuccess,
    updateStatusSuccess,
    updateStatus,
    updateFalied
  } from "../redux/orderSlice";
  import { take, call, put, fork, all } from "redux-saga/effects";
  import apiModule from "../http";
  const { createOrderApi, updateStatusApi } = apiModule()
  
  function* createOrderSaga(payload) {
    try {
      const { data } = yield call(createOrderApi, payload);
      if (data) yield put(createOrderSuccess(data));
    } catch (error) {
      yield put(createOrderFailed(error.response.data.error.message));
    }
  }

  function* updateStatusOrder(payload) {
    try {
      const {data} = yield call(updateStatusApi, payload)
      if(data) yield put(updateStatusSuccess(data.success))
    } catch (error) {
      yield put(updateFalied(error.response.data.error.message));
    }
  }

  function* updateStatusOr() {
    while (true) {
      const {payload} = yield take(updateStatus);

      yield fork(updateStatusOrder, payload);
    }
  }

  // function* watcherOrder() {
  //   while (true) {
  //     yield take(getOrderID);
  //     yield fork(getOrderUser);
  //   }
  // }

  function* watcherGetOrder() {
    while (true) {
      const { payload } = yield take(createOrder);
      yield fork(createOrderSaga, payload);
    }
  }

  export default function* () {
    yield all([watcherGetOrder(), updateStatusOr()]);
  }
  