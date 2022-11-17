import React, { useState, useEffect } from 'react';
import {
  Form,
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Col,
} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';
import Loader from '../components/Loader';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split('=')[1] : '/';

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error } = userRegister;

  //we need userInfo from login state,if user is logged in: no register screen
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [userInfo, navigate, redirect]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords are not match');
    } else {
      setMessage(null);
      dispatch(register(name, email, password));
    }
  };

  return (
    <FormContainer>
      <h1>SIGN UP</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {console.log(message)}
      {loading && <Loader />}
      <Form onSubmit={handleSubmit}>
        <FormGroup controlId='name'>
          <FormLabel>Name</FormLabel>
          <FormControl
            type='text'
            placeholder='Enter Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId='email' className='my-3'>
          <FormLabel>Email</FormLabel>
          <FormControl
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId='password' className='my-3'>
          <FormLabel>Password</FormLabel>
          <FormControl
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId='confirmPassword' className='my-3'>
          <FormLabel>Confirm Password</FormLabel>
          <FormControl
            type='password'
            placeholder='Repeat password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></FormControl>
        </FormGroup>

        <Button type='submit' className='py-3 my-3' variant='primary'>
          Register
        </Button>

        <Row>
          <Col>
            Already have account?
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              Sign in here
            </Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default RegisterScreen;
