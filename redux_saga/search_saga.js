import {
    searchFailed,
    searchStart,
    searchSuccess
  } from "../redux/searchSlice";
  import { call, put, all, takeLatest, delay } from "redux-saga/effects";
  import apiModule from "../http";
  const { searchProduct } = apiModule()
  
  
  function* searchSagaFn(action) {
    try {
      yield delay(1100)
      const { data } = yield call(searchProduct, action.payload);
      console.log(data);
      if (data) yield put(searchSuccess(data));
    } catch (error) {
      yield put(searchFailed(error.response.data.error.message));
    }
  }

  function* watcherSearch() {
    yield takeLatest(searchStart, searchSagaFn)
  }

  export default function* () {
    yield all([watcherSearch()]);
  }
  