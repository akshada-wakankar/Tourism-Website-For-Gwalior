import React, { Component }  from "react";
import Navbar from "./components/Navbar";
import 'semantic-ui-css/semantic.min.css'
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import Home from "./components/pages/Home";
import Travel from "./components/pages/Travel";
import Hotels from "./components/pages/Hotels";
import History from "./components/pages/History";
import Food from "./components/pages/Food";
import Transport from "./components/pages/Transport";
import HotelDetail from "./components/pages/HotelDetail";
import Login from "./containers/login";
import Signup from "./containers/signup"
import Profile from "./containers/Profile"
import OrderSummary from "./components/pages/OrderSummary"
import SimpleMap from "./components/pages/mappage"
import * as actions from "./store/actions/auth"

class App extends Component{
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
  
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} {...this.props}/>
          <Route path="/travel"  component={Travel} />
          <Route path="/history"  component={History} />
          <Route path="/food"  component={Food} />
          <Route path="/transport"  component={Transport} />
          <Route exact path="/hotels"  component={Hotels} />
          <Route path="/hotels/:hotelID"  component={HotelDetail}/>
          <Route path="/login"  component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/profile" component={Profile} />
          <Route path="/order-summary" component={OrderSummary} />
          <Route path="/map" component={SimpleMap}/>

        </Switch>
      </Router>
    </>
  );
}}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default connect(mapStateToProps,
  mapDispatchToProps)(App);
