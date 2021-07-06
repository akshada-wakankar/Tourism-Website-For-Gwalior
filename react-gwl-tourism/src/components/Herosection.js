import React from "react";
import "../App.css";
import { Button } from "./Button";
import "./Herosection.css";
import poster from "./pictures/fort2.jpg";

function Herosection() {
  return (
    <div className="hero-container">
      <img src={poster} alt="Gwalior fort"></img>
      <h1>Welcome to Gwalior</h1>
      <p>Explore the city of heritage...</p>
      <div className="hero-btns">
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}

export default Herosection;
