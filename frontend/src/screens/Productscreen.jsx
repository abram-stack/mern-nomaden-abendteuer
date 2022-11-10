import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { detailProduct } from '../actions/productActions';

const Productscreen = () => {
  const { id } = useParams();
  //const [product, setProduct] = useState([]);
  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.productDetail);

  const { loading, product, error } = productDetail;

  useEffect(() => {
    // const fetchProduct = async () => {
    //   const { data } = await axios.get(`/api/products/${id}`);
    //   setProduct(data);
    // };

    // fetchProduct();
    dispatch(detailProduct(id));
  }, [dispatch, id]);

  // const product = products.find((prod) => prod._id === id);

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
              <ListGroup.Item className='d-grid gap-2'>
                <button
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
