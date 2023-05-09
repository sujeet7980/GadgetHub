import React, { useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import FormContainer from "../components/shared/FormContainer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userAction";
import Message from "../components/shared/Message";
import Loader from "../components/shared/Loader"
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const dispatch =useDispatch();
  const navigate= useNavigate();
  const redirect = location.search?location.search.split("=")[1] : '/';
  const userLogin = useSelector(state=>state.userLogin)
  const {loading,error,userInfo}= userLogin;
  // console.log(loading,error,userInfo)
  useEffect(()=>{
    // console.log(location.search());
    if(userInfo) navigate(redirect)
  },[userInfo,redirect,navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(email,password);
    dispatch(login(email,password))
  };
  return (
    <>
      <FormContainer>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader></Loader>}
        <h1>SIGN IN</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit">SIGN IN</Button>
        </Form>
        <Row>
          <Col>
            New Customer ?
            <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
              Register
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default LoginScreen;
