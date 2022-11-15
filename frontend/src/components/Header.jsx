import { Container, Navbar, Nav } from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';
// import { LinkContainer } from 'react-router-bootstrap';

// if we are using bootstrap we can also wrap the <Link/> in container
const Header = () => {
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to='/'>
            Nomad & Abend
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbarScroll' />
          <Navbar.Collapse id='navbarScroll'>
            <Nav className='ms-auto'>
              <Nav.Link as={Link} to='/cart'>
                <i className='fa-solid fa-cart-shopping'></i>Cart
              </Nav.Link>
              <Nav.Link as={Link} to='/login'>
                <i className='fa-solid fa-user'></i>Signin
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
