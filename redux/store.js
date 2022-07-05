import { configureStore } from "@reduxjs/toolkit";
import cart from "./cartSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../redux_saga/rootSaga";
import authSlice from "./authSlice";
import orderSlice from './orderSlice'
import searchSlice from './searchSlice'


const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    cart: cart,
    auth: authSlice,
    order: orderSlice,
    search: searchSlice
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
