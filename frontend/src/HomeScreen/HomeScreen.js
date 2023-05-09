import React,{useEffect}from 'react'
import { Row,Col } from 'react-bootstrap';
import { useDispatch,useSelector } from 'react-redux';
import { ListProducts } from '../actions/productActions';
import ProductScreen from './ProductScreen';
import Loader from '../components/shared/Loader';
import Message from '../components/shared/Message';
const HomeScreen = () => {
    const dispatch= useDispatch();
    const productList = useSelector(state => state.productList)
    const {loading,error,products}=productList;
    useEffect(()=>{
       dispatch(ListProducts());
    },[dispatch]);
  return (
    <>
    {
      loading?<Loader/> : error? <Message variant='danger' message={error}/> : <Row>
      {
          products.map((product)=>(
              <Col key={product.id} md={3}>
               <ProductScreen product={product}/>
              </Col>
          ))
      }
  </Row>
    }
    </>
        

  )
}

export default HomeScreen;