import React from "react";
import "../../App.css";
import { Button, Container,  Icon, Image, Card } from 'semantic-ui-react'


export default function Transport() {
  return (
  <div>
  <h1 className="transport">TRANSPORT</h1>
  <h1 className="train">Book your trains here<br></br><Button size='massive' href="https://www.irctc.co.in/nget/train-search">Find Trains</Button></h1>
  <h1 className="plane">Book your flights here<br></br><Button size='massive' href="https://www.air.irctc.co.in/" primary>Find Flights</Button></h1>

  </div>);
}
