import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { productDetailReducer, productListReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'

const reducers = {
  productList: productListReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
};

const cartItemsFromLocalStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const initialState = {
  cart: {cartItems: cartItemsFromLocalStorage}
};
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