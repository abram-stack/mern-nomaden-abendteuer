import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { productDetailReducer, productListReducer } from './reducers/productReducers'


const reducers = {
  productList: productListReducer,
  productDetail: productDetailReducer
};
const initialState = {};
const middleware = [thunk]


//was: createStore
const store = configureStore({
  reducer: reducers,
  preloadedState: initialState,
  middleware: middleware,
  devTools: process.env.NODE_ENV !== 'production'
  }
)

export default store;