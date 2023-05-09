import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Button, 
  Card,
  Image,
  ListGroup,
  ListGroupItem,
  FormControl,
} from "react-bootstrap";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { useLocation, useParams, Link, useNavigate } from "react-router-dom";
import Message from "../components/shared/Message";
const CartScreen = () => {
  const productId = useParams().id;
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // console.log(qty);
  useEffect(() => {
    if(!userInfo){
      navigate('/login')
    }
    dispatch(addToCart(productId, qty));
  }, [dispatch, productId, qty]);
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const checkoutHandler =()=>{
    navigate('/shippingAddress');
  }
  return (
    <>
      <Row>
        <Col md={9}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message variant="primary">
              {" "}
              Your Cart is Empty ! <Link to="/"> Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroupItem>
                  <Row
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <FormControl
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </FormControl>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i
                          className="fa fa-trash text-danger"
                          aria-hidden="true"
                        ></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
        </Col>
        {cartItems.length!==0 && <Col md={3} className="m-auto">
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h2>Subtotal ({cartItems.reduce((acc,item)=> acc+item.qty,0)}) items</h2>
                ${
                  cartItems.reduce((acc,item)=>acc+item.qty*item.price,0)
                  .toFixed(2)
                }
              </ListGroupItem>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed to checkOut
              </Button>
            </ListGroup>
          </Card>
          
        </Col>}
        
      </Row>
      
    </>
  );
};

export default CartScreen;
