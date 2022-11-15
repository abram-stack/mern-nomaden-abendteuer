import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Row,
  Col,
  Form,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;

  const navigate = useNavigate();
  //to get the prop of end point URL
  const location = useLocation();
  const redirect = location.search ? location.search.split('=')[1] : '/';
  //use case: if user already logged in, we want to redirect back to where user left before.ie cart.(we dont want to put usere in log in screen anymore)
  //TODO: we want to redirect to wherever client was,
  //we need location. (inside the params) useLocation
  //create redirect that has the value of if location.search ? location.search.split('=')[1] : '/'
  useEffect(() => {
    if (userInfo) navigate('/');
  }, [navigate, userInfo, redirect]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //TODO: dispatch login
    dispatch(login(email, password));
  };
  return (
    <FormContainer>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <h1>SIGN IN</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <FormControl
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId='password' className='my-3'>
          <FormLabel>Password</FormLabel>
          <FormControl
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></FormControl>
        </FormGroup>
        <Button type='submit' variant='primary' className='my-5'>
          Sign In
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register Here
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
