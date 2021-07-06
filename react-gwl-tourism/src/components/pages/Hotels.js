import React from "react";
import HotelList from "./hotellist";
import 'semantic-ui-css/semantic.min.css'
import "../../App.css";

export default function Hotels() {
  return (
    <div>
  <h1 className="hotels">HOTELS</h1>
  <HotelList/>
  </div>

  );

}
