import React from "react";
import { Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Rating from "../components/Rating";
const ProductScreen = ({ product }) => {
  return (
    <>
      <Card style={{ width: "18rem" }} className="my-3 p-3 rounded">
        <LinkContainer to={`/product/${product._id}`}>
          <div style={{ height: "100px", width: "200px" }}>
            <Card.Img
              variant="top"
              src={product.image}
              style={{ objectFit: "cover", marginTop: "10px", height: "18rem" }}
              fluid="true"
            />
          </div>
        </LinkContainer>
        <Card.Body style={{ gap: "10px" }}>
          <Card.Title style={{ height: "3rem" }}>
            <strong>{product.name}</strong>
          </Card.Title>
          <Card.Text>
            <Rating value={product.rating} text={product.numReviews} />
          </Card.Text>
          <div></div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="d-flex align-items-center">
              <span>{product.price}</span>
            </div>
            <LinkContainer to={`/product/${product._id}`}>
              <Button variant="primary">Buy Now</Button>
            </LinkContainer>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};
export default ProductScreen;
