import React, { useEffect, useState } from "react";
import { Row, Col, ListGroup, Image } from "react-bootstrap";
import { getOrderDetails, payOrder } from "../actions/orderActions";
import { PayPalButtons ,PayPalScriptProvider} from "@paypal/react-paypal-js";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/shared/Loader";
import Message from "../components/shared/Message";
import axios from "axios";
import { ORDER_PAY_RESET } from "../constants/orderConstant";
import {format} from 'date-fns'
const OrderScreen = () => {
  const [sdkReady, setSdkReady] = useState(false);
  const [paypalId,setPaypalId] = useState(null);
  const dispatch = useDispatch();
  const orderId = useParams().id;
  // console.log(orderId);
  
  const orderDetails = useSelector((state) => state.orderDetails);
  // console.log(orderDetails);
  const { order, loading, error } = orderDetails;
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;
  // console.log(successPay);
  if (order && order.orderItems) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }
  const successPaymentHandler = (PaymentResponse) => {
    // console.log(PaymentResponse);
    dispatch(payOrder(orderId,PaymentResponse));
  };
  const addPaypalScript = async () => {
    const { data: clientId } = await axios.get("/api/config/paypal");
    const script = document.createElement("script");
    // console.log(clientId);
    setPaypalId(clientId);
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };
  useEffect(() => {
    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET});
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) addPaypalScript();
      else setSdkReady(true);
    }
  }, [dispatch,order,loadingPay,loading,successPay,orderId]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) :  (
    (order &&
    <>
      <h2>Order {order._id}</h2>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address :</strong>
                {order.shippingAddress.address}&nbsp;
                {order.shippingAddress.city}&nbsp;
                {order.shippingAddress.state}&nbsp;
                {order.shippingAddress.postalCode}&nbsp;
              </p>
              {order.isDeliverd ? (
                <Message variant="success">Paid On ${format(new Date(order.isDeliverd),"MM/dd/yyyy HH:mm:ss"
                 )}
                </Message>
              ) : (
                <Message variant="danger">Not Deliverd</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>{order.paymentMethod}</strong>
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid On {order.paidAt}</Message>
              ) : (
                 <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message variant="primary">Your Cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
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
                <Col>$ {order.itemsPrice}</Col>
              </Row>
              <Row>
                <Col>Shipping</Col>
                <Col>$ {order.shippingPrice}</Col>
              </Row>
              <Row>
                <Col>Tax</Col>
                <Col>$ {order.taxPrice}</Col>
              </Row>
              <Row>
                <Col>Total</Col>
                <Col>$ {order.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
            {!order.isPaid && (
              <ListGroup.Item>
                {/* {loadingPay && <Loader />} */}
                {!sdkReady ? (
                  <Loader />
                ) : (
                  (<PayPalScriptProvider options={{"client-id":paypalId}}>
                  <PayPalButtons
                  createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: order.totalPrice,
                                },
                            },
                        ],
                    });
                  }}
                    // amount={order.totalPrice}
                    onApprove={(data, actions) => {
                      return actions.order.capture().then((details) => {
                        console.log(details);
                        successPaymentHandler(details);
                      });
                  }}
                  />
                    </PayPalScriptProvider>)
                  
                )}
              </ListGroup.Item>
            )}
          </ListGroup>
        </Col>
      </Row>
    </>)
  );
};

export default OrderScreen;
