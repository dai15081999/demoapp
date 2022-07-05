import {all} from 'redux-saga/effects'
import authSaga from './auth_Saga'
import orderSaga from './order_saga'
import searchSaga from './search_saga'

export default function* rootSaga() {
    yield all([authSaga(), orderSaga(), searchSaga()]);
  }