import React, { useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import FormContainer from "../components/shared/FormContainer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import{registerUser} from '../actions/userAction'
import Message from "../components/shared/Message";
import Loader from "../components/shared/Loader"
const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [message,setMessage]= useState("")
  const location = useLocation();
  const dispatch =useDispatch();
  const navigate= useNavigate();
  const redirect = (location.search) ?location.search.split("=")[1] : '/';
  const userRegister  = useSelector(state=>state.userRegister)
  const {loading,error,userInfo}= userRegister;
  console.log(loading,error,userInfo);
  useEffect(()=>{
    if(userInfo) navigate(redirect)
  },[userInfo,redirect,navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    if(password!==confirmPassword){
        setMessage("Password do not match");
    }
    else{
        dispatch(registerUser(name,email,password));
        
    }
  };
  return (
    <>
      <FormContainer>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader/>}
        {message && <Message variant="danger">{message}</Message>}
        <h1>SIGN IN</h1>
        <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Re-enter Password"
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit">REGISTER</Button>
        </Form>
        <Row>
          <Col>
             Have an account ?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
            >Login</Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default RegisterScreen;
