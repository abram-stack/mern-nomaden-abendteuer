import React from 'react';
import products from '../product';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';

const Homescreen = () => {
  return (
    <div>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Homescreen;
