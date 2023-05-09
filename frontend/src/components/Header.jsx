import React from "react";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userAction";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo}=userLogin;
  const navigate=useNavigate();
  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');
  };
  return (
    <Navbar bg="dark" expand="lg" variant="dark" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand href="#home">Online Shopping </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/cart">
              <Nav.Link>
                <i className="fa-solid fa-cart-shopping"></i>
                &nbsp; Cart
              </Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <Dropdown>
                <Dropdown.Toggle
                  variant="Secondary"
                  id="dropdown-basic"
                  className="text-white"
                >
                  {userInfo.name}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <LinkContainer to="profile"><Dropdown.Item >PROFILE</Dropdown.Item></LinkContainer>
                  <Dropdown.Item onClick={logoutHandler}>LOGOUT</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fa-solid fa-user"></i>
                  &nbsp; Sign Up
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
