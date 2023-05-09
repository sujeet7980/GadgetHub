import React, { useEffect } from "react";
import { Button, Row, Col, ListGroup, Image } from "react-bootstrap";
import { createOrder,getOrderDetails } from "../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Message from "../components/shared/Message";
const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  const navigate = useNavigate();
  cart.itemsPrice = addDecimal(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimal(cart.itemsPrice > 500 ? 0 : 50);
  cart.taxPrice = addDecimal(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice =
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice);
  const placeOrder = useSelector((state) => state.placeOrder);
  const {  orders, success } = placeOrder;
  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };
  useEffect(() => {
    if (success) {
      dispatch(getOrderDetails(orders._id));
      navigate(`/order/${orders._id}`);
    }
  },[navigate,success]);
  return (
    <>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address :</strong>
                {cart.shippingAddress.address}&nbsp;
                {cart.shippingAddress.city}&nbsp;
                {cart.shippingAddress.state}&nbsp;
                {cart.shippingAddress.postalCode}&nbsp;
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>{cart.paymentMethod}</strong>
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message variant="primary">Your Cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row className="align-items-center">
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            className="w-100 "
                          />
                        </Col>
                        <Col md={2}>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} * {item.price}$ &nbsp;={" "}
                          {item.qty * item.price}$
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Order Summary</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Items</Col>
                <Col>$ {cart.itemsPrice}</Col>
              </Row>
              <Row>
                <Col>Shipping</Col>
                <Col>$ {cart.shippingPrice}</Col>
              </Row>
              <Row>
                <Col>Tax</Col>
                <Col>$ {cart.taxPrice}</Col>
              </Row>
              <Row>
                <Col>Total</Col>
                <Col>$ {cart.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
            <Button
              type="button"
              className="btn-block"
              disabled={cart.cartItems === 0}
              onClick={placeOrderHandler}
            >
              Place Order
            </Button>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
