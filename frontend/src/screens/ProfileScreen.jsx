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
import { useLocation, useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetail } from '../actions/userActions';
import Loader from '../components/Loader';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  //we need userInfo from login state,if user is logged in: no register screen
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  //might find the bug: only read loading, one below then there is {user} double hierarchy
  //or maybe it is a problem from the object return from the API
  console.log(userDetails);

  useEffect(() => {
    console.log('user: ', user);
    if (!userInfo) {
      navigate('/login');
    } else {
      if (!user || !user.name) {
        console.log('no userdetails provided yet');
        dispatch(getUserDetail('profile'));
      } else {
        console.log('name set');
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, userInfo, navigate, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (password !== confirmPassword) {
    //   setMessage('Passwords are not match');
    //   else {
    //     //disptach update
    //   }
  };

  return (
    <Row>
      <Col>
        <h1>PROFILE</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
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
            Update
          </Button>
        </Form>
      </Col>
      <Col>Your Orders</Col>
    </Row>
  );
};

export default ProfileScreen;
