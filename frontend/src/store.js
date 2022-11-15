import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { productDetailReducer, productListReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userLoginReducer } from './reducers/userReducers';

const reducers = {
  productList: productListReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
  userLogin: userLoginReducer
};

const cartItemsFromLocalStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userLoginFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
  cart: { cartItems: cartItemsFromLocalStorage },
  userLogin: {userInfo: userLoginFromLocalStorage}
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