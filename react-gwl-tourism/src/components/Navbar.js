import React, { useState, useEffect } from "react";
import { Link , withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../store/actions/auth"
import "./Navbar.css";
import { fetchCart } from "../store/actions/cart";
import {
  Dropdown,
  Menu,
} from 'semantic-ui-react'

function Navbar(props) {

  
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
    props.fetchCart();
  }, []);

  window.addEventListener("resize", showButton);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const { authenticated, cart, loading} = props;
  console.log(cart);
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            Gwalior Tourism &nbsp;<i className="fas fa-route"></i>
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/history"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                History
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/travel"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Places to Travel
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/hotels"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Find Hotels
              </Link>
            </li>

          {authenticated ? ( 
            <React.Fragment>
              <li className="nav-item">
              <Menu compact>
                  <Dropdown black className='icon' floating labeled icon='ticket'  loading={loading} text={`${cart!=null ? cart.order_rooms.length : 0} rooms`} simple item  >
                    <Dropdown.Menu>
                      {cart && cart.order_rooms.map(order_room=>{
                        return <Dropdown.Item key={order_room.id}>{order_room.numberofrooms}X{order_room.room}</Dropdown.Item>
                      })}                    
                      {cart && cart.order_rooms.length<1 ? (<Dropdown.Item>Your cart is empty</Dropdown.Item>): null }
                      <Dropdown.Divider />
                        <Dropdown.Item  text="Checkout" onClick={()=> props.history.push('/order-summary')}></Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Menu>
              </li>
              <li className="nav-item">
              <button className="btn btn-primary">
              <Link header onClick={() => props.logout()}>
                Logout
              </Link>
              </button>
              </li>
              </React.Fragment>
            ) : (
              <React.Fragment>          
                <li className="nav-item">
                <button className="btn btn-primary">
                  <Link  to="/login">Login</Link>
                </button> </li>
                <li className="nav-item">
               <button className="btn btn-primary">
                <Link  to="/signup">Signup</Link></button>
                </li>
                </React.Fragment>
            )}
            
           </ul>
        </div>
      </nav>
    </>
  );
}
const mapStateToProps = state => {
  return {
    authenticated: state.auth.token !== null,
    cart: state.cart.shoppingCart,
    loading: state.cart.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    fetchCart: ()=> dispatch(fetchCart())

  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Navbar)
);

