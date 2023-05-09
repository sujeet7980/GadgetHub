import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import FormContainer from "../components/shared/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import { useNavigate } from "react-router-dom";

const ShippingAddressScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [state, setState] = useState(shippingAddress.state);
  const submitHandler = (e)=>{
    e.preventDefault();
    dispatch(saveShippingAddress({address,city,postalCode,state}));
    navigate('/payment');
  }
  return (
    <FormContainer>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>PostalCode</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter postalCode"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant="primary" className="mt-3">Continue</Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingAddressScreen;
