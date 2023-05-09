import React, { useEffect, useState } from "react";
import { Button, Form, Row, Col, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails, updateUserDetails } from "../actions/userAction";
import { getMyOrderList } from "../actions/orderActions";
import Message from "../components/shared/Message";
import Loader from "../components/shared/Loader";
import {format} from 'date-fns'
const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;
  const orderedList = useSelector((state) => state.orderedList);
  const { loading: loadingList, orderList ,error:errorList } = orderedList;
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user) {
        dispatch(getDetails());
      }
      if (!orderList) {
        dispatch(getMyOrderList());
      }
    }
  }, [userInfo, user, navigate, dispatch,orderList]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserDetails({ id: user._id, name, email, password }));
  };
  return (
    <>
      <Row>
        <Col md={3}>
          <h1>UPDATE INFORMATION</h1>
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          {success && (
            <Message variant="success">{"update successfully"}</Message>
          )}

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
        </Col>
        <Col md={9}>
          <h1>Ordered Items</h1>
           {loadingList &&  <Loader /> }
           {errorList && <Message variant="danger">{errorList}</Message>}
           {orderList && orderList.length!==0 && <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERD</th>
                  <th>Check</th>
                </tr>
              </thead>
              <tbody>
                {orderList.map((order) => (
                  <tr key={order._id} >
                    <td>{order._id}</td>
                    <td>{format(new Date(order.createdAt),"MM/dd/yyyy HH:mm:ss")}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        format(new Date(order.paidAt), "MM/dd/yyyy HH:mm:ss")
                      ) : (
                        <i
                        className="fas fa-times"
                        style={{ color: "red" }}
                      ></i>
                      )}
                    </td>
                    <td className=" d-flex  justify-content-center">
                      {order.isDelivered ? (
                        format(new Date(order.isDelivered), "MM/dd/yyyy HH:mm:ss")
                      ) : (
                        <i
                        className="fas fa-times"
                        style={{ color: "red" }}
                      ></i>
                      )}
                    </td>
                    <td >
                      <Link to={`/order/${order._id}`}>
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>}
        </Col>
      </Row>
    </>
  );
};

export default ProfileScreen;
