import { Container } from "react-bootstrap";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./HomeScreen/HomeScreen";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import ProductDetails from "./HomeScreen/ProductDetails";
import CardScreen from './HomeScreen/CartScreen'
import LoginScreen from "./HomeScreen/LoginScreen";
import RegisterScreen from "./HomeScreen/RegisterScreen";
import ProfileScreen from "./HomeScreen/ProfileScreen";
import ShippingAddressScreen from "./HomeScreen/ShippingAddressScreen";
import PaymentScreen from "./HomeScreen/PaymentScreen";
import PlaceOrderScreen from "./HomeScreen/PlaceOrderScreen";
import OrderScreen from "./HomeScreen/OrderScreen";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main>
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/login" element={<LoginScreen/>} />
              <Route path="/order/:id" element={<OrderScreen/>} />
              <Route path="/placeorder" element={<PlaceOrderScreen/>} />
              <Route path="/payment" element={<PaymentScreen/>} />
              <Route path="/shippingAddress" element={<ShippingAddressScreen/>} />
              <Route path="/profile" element={<ProfileScreen/>} />
              <Route path="/register" element={<RegisterScreen/>} />
              <Route path="/product/:id" element={<ProductDetails/>} exact/>
              <Route path="/cart/:id?" element={<CardScreen/>} exact/>
            </Routes>
          </Container>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}
export default App;
