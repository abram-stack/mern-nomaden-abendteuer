import axios from 'axios';
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_LOADING,
  USER_LOGOUT,
  USER_REGISTER_LOADING,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAIL_REQUEST,
  USER_DETAIL_SUCCESS,
  USER_DETAIL_FAIL,
  USER_DETAIL_RESET
} from '../constants/userConstants';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_LOADING,
    });

    const config = { 
      headers: {
        'Content-Type': 'application/json'}
    }
    //call API
    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) =>  { 
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT }
  )
  dispatch({type: USER_DETAIL_RESET})
}

export const register = (name, email, password) => async(dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_LOADING,
    });

    const config = { 
      headers: {
        'Content-Type': 'application/json'}
    }
    
    //call API
    const { data } = await axios.post(
      '/api/users/',
      { name, email, password },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
    });

    // //log the user in if register succesful
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}


export const getUserDetail = (id) => async(dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAIL_REQUEST,
    });

    const { userLogin: { userInfo } } = getState();

    const config = { 
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`}
    }
    
    //call API
    const { data } = await axios.get(
      `/api/users/${id}`,
      config
    );

    dispatch({
      type: USER_DETAIL_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: USER_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}