import React, { useEffect } from 'react';
//import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

//import SearchBox from './SeachBox.js';
import { logout } from '../actions/userActions.js';
import { listProductCategories } from '../actions/productActions.js';

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productCategories = useSelector((state) => state.productCategories);
  const { categories } = productCategories;

  useEffect(() => {
    dispatch(listProductCategories());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const logoutHandler = () => {
    dispatch(logout());
  };
  //Searchbar:
  //<Route render={({ history }) => <SearchBox history={history} />} />
  return (
    <header>
      <Container>
        <div className='d-none d-md-flex justify-content-center px-3'>
          <LinkContainer to='/'>
            <h2 className='mt-2 mb-0 pb-0 text-dark cursor-pointer'>
              Ecommerce Site
            </h2>
          </LinkContainer>
        </div>
        <Navbar variant='light' expand='md' className='py-4' collapseOnSelect>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <div className='d-flex justify-content-center px-3 d-md-none'>
            <LinkContainer to='/'>
              <h2 className='my-0 text-dark cursor-pointer'>Ecommerce Site</h2>
            </LinkContainer>
          </div>
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mx-auto'>
              <NavDropdown title='Shop' id='nav-dropdown'>
                {categories.parent &&
                  categories.parent.map((category, index) => (
                    <LinkContainer
                      to={`/shop/${category.toLowerCase()}`}
                      key={index}
                    >
                      <NavDropdown.Item>{category}</NavDropdown.Item>
                    </LinkContainer>
                  ))}
              </NavDropdown>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> cart
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  {userInfo && userInfo.isAdmin && (
                    <>
                      <LinkContainer to='/admin/userlist'>
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/productlist'>
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/orderlist'>
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                    </>
                  )}
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link href='/login'>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </header>
  );
};

export default Header;
