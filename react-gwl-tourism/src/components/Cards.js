import React from "react";
import CardItem from "./CardItem";
import img1 from "./pictures/telikamandir.jpg";
import img2 from "./pictures/hotelroom.jpg";
import img3 from "./pictures/gujarimahal.jpg";
import img4 from "./pictures/dine.jpg";
import img5 from "./pictures/train.jpg";
import "./Cards.css";
function Cards() {
  return (
    <div className="cards">
      <h1>Check out these epic destinations...</h1>
      <div className="cards__container"></div>
      <div className="cards__wrapper">
        <ul className="cards__items">
          <CardItem
            src={img1}
            text="Explore the city..."
            label="Explore"
            path="/travel"
          />

          <CardItem
            src={img3}
            text="Know more about Gwalior"
            label="History"
            path="/history"
          />
        </ul>
        <ul className="cards__items">
          <CardItem
            src={img2}
            text="Find places to stay..."
            label="Hotels"
            path="/hotels"
          />
          <CardItem
            src={img4}
            text="Explore places to dine..."
            label="Food"
            path="/food"
          />
          <CardItem
            src={img5}
            text="Find modes of travel..."
            label="Transport"
            path="/transport"
          />
        </ul>
      </div>
    </div>
  );
}

export default Cards;
