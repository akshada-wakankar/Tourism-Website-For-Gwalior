import React from "react";
import { Link } from "react-router-dom";
import { Button } from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import {ReviewURL} from '../constants'
import axios from 'axios'

import "./Footer.css";
class Footer extends React.Component
 {
  state={
    loading: false,
    error: null,
    data: [],
    name:null,
    detail:null,
  }
  componentDidMount(){
    this.handleFetchReview();
  }
  handleFetchReview=()=>{
    this.setState({loading:true})
    axios.post(ReviewURL, {name: this.state.name, detail: this.state.detail,})
    .then(res => {
      console.log(res.data);
      this.setState({name:"",detail:"", loading:false})
    })
    .catch(err=>{
      this.setState({
        error: err, loading: false 
      })
    })
  };
  handleInput = (e) => { 
    this.setState({ 
        [e.target.name]: e.target.value, 
    }); 
}; 
   render(){
   
    const {data,error,loading}=this.state;
  return (
   
    <div className="footer-container">
      <section className="footer-subscription">
        <p className="footer-subscription-heading">
          Do you have suggestions to improve this website?
        </p>
        <p className="footer-subscription-text">Type them up!</p>
        <div className="input-areas">
          <form onSubmit={()=>this.handleFetchReview()}>
            <input type="text" name="name" onChange={this.handleInput} placeholder="Your Name..." className="footer-input"></input><br></br>
            <textarea
              name="detail"
              placeholder="Your Suggestion..."
              className="footer-input"
              onChange={this.handleInput}
            ></textarea>
            <br></br>
            <Button type="submit" primary floated='centre'>Submit</Button>
          </form>
        </div>
      </section>
      <h1 className="contact-us">CONTACT US</h1>
      <div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>
              <i className="fas fa-phone-square-alt"></i>Phone:
            </h2>
            <h3>+0000000000</h3>
            <h3>0751-0000000</h3>
          </div>
          <div className="footer-link-items">
            <h2>
              <i className="fas fa-envelope-square"></i>Email:
            </h2>
            <h3>email@mail.com</h3>
            <h3>email@mail.com</h3>
          </div>

          <div className="footer-link-items">
            <h2>Social media:</h2>
            <h3>
              <Link>
                <i className="fab fa-instagram-square"></i>
              </Link>
              <Link>
                <i className="fab fa-facebook-square"></i>
              </Link>
              <Link>
                <i className="fab fa-youtube-square"></i>
              </Link>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
 }
 export default withRouter (Footer);
