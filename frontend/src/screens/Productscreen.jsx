import { React, useEffect, useState } from 'react';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  ListGroupItem,
  FormControl,
} from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { detailProduct } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';

const Productscreen = () => {
  const { id } = useParams();
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productDetail = useSelector((state) => state.productDetail);

  const { loading, product, error } = productDetail;

  useEffect(() => {
    dispatch(detailProduct(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    //TODO: directly call action instead of using param. Basically: onChange in formControl, and here
    // and navigate /cart
    dispatch(addToCart(product._id, qty));
    navigate('/cart');
  };

  return (
    <div>
      <Link to='/' className='btn btn-outline-dark my-3'>
        Go Back
      </Link>
      <Row>
        {/* md={6 }*/}
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        {/* md={md3} */}
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: {product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        {/* md={md3} */}
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price: </Col>
                  <Col>{product.price} </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Stock</Col>
                  <Col>
                    {product.countInStock > 0 ? 'in stock' : 'out of stock'}{' '}
                  </Col>
                </Row>
              </ListGroup.Item>

              {product.countInStock > 0 && (
                <ListGroupItem>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <FormControl
                        style={{ padding: '0.75rem 0.2rem 0.75rem 0.4rem' }}
                        as='select'
                        value={qty}
                        onChange={(e) => setQty(e.target.value)} //TODO: dispatch action here instead and navigate to '/cart'
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </FormControl>
                    </Col>
                  </Row>
                </ListGroupItem>
              )}

              <ListGroup.Item className='d-grid gap-2'>
                <button
                  onClick={addToCartHandler}
                  className='btn btn-primary'
                  type='button'
                  disabled={product.countInStock === 0}
                >
                  Add To cart
                </button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Productscreen;
