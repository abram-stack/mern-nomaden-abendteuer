import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  Form,
  Button,
  Card,
  ListGroup,
  FormControl,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';

const Cartscreen = () => {
  //TODO: changing naming conventions from products to _id as ID, more consistency
  //since we dont use/ sending info over params,

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    navigate('/cart');
  };

  const checkOutHandler = () => {
    //TODO: proceed to log in if not logged in and to shipping if logged in
    //if user not logged id, the redirect will be appended into url, we need to catch that in login
    navigate(`/login?redirect=shipping`);
  };
  return (
    <Row>
      <Col md={8}>
        <h1>Shoping cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/'>go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((cart) => (
              <ListGroup.Item key={cart.product}>
                <Row>
                  <Col md={2}>
                    <Image src={cart.image} alt={cart.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${cart.product}`}>{cart.name}</Link>
                  </Col>
                  <Col md={2}>${cart.price}</Col>
                  <Col md={2}>
                    <Form.Select
                      // as='select'
                      style={{ padding: '0.75rem 0.2rem 0.75rem 0.4rem' }}
                      value={cart.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(cart.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(cart.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(cart.product)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkOutHandler}
              >
                Proceed to Check Out
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default Cartscreen;
