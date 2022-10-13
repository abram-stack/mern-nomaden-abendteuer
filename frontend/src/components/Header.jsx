import { MdAddShoppingCart, MdPerson } from 'react-icons/md';
import { Container, Navbar, Nav } from 'react-bootstrap';
import React from 'react';

const Header = () => {
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand href='/'>Nomad & Abend</Navbar.Brand>
          <Navbar.Toggle aria-controls='navbarScroll' />
          <Navbar.Collapse id='navbarScroll'>
            <Nav className='ms-auto'>
              <Nav.Link href='/cart'>
                <i>
                  <MdAddShoppingCart />
                </i>
                Cart
              </Nav.Link>
              <Nav.Link href='/login'>
                <i>
                  <MdPerson />
                </i>
                Sign In
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
