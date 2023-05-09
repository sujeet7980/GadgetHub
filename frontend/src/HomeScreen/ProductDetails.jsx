import React, { useState, useEffect } from "react";
import { Row, Col, Button, Container, FormControl } from "react-bootstrap";
import { useParams ,useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../components/Rating";
import { LinkContainer } from "react-router-bootstrap";
import { ProductDetail } from "../actions/productActions";
import Loader from "../components/shared/Loader";
import Message from "../components/shared/Message";
const ProductDetails = () => {
  const [qty, setqty] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const addTOCartHandler=()=>{
    navigate(`/cart/${id}?qty=${qty}`)
  }
  useEffect(() => {
    dispatch(ProductDetail(id));
  }, [dispatch, id]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" message={error} />
      ) : (
        <div style={{ marginTop: "100px" }}>
          <LinkContainer to="/">
            <span className="btn btn-light">&larr; &nbsp; GO BACK</span>
          </LinkContainer>
          <Row className="gap-auto">
            <Col md={6}>
              <div style={{ height: "600px", width: "500px" }}>
                <img
                  src={product.image}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  fluid="true"
                  className="w-100"
                  alt={product.catagory}
                ></img>
              </div>
            </Col>
            <Col md={5}>
              <div className="d-flex flex-column justify-content-center gap-4 h-100">
                <h1>{product.name}</h1>
                <Rating value={product.rating} text={product.numReviews} />
                <span>Price : {product.price}</span>
                <span>{product.description}</span>
                <span>
                  <strong>Status : </strong>
                  {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}{" "}
                </span>
                {product.countInStock > 0 && (
                  <Container style={{ display: "flex" ,justifyContent:"space-between" , padding: "0rem"}}>
                    <div className="d-flex align-items-center">
                      <span>Quantity </span>
                    </div>
                    <FormControl
                      as="select"
                      value={qty}
                      onChange={(e) => setqty(e.target.value)}
                      style={{width: "20rem"}}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </FormControl>
                  </Container>
                )}
                <Button onClick={addTOCartHandler}>Add to Cart</Button>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
