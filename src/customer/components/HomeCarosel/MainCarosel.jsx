import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { MainCaroselData } from "./MainCaroselData";

const MainCarosel = () => {
  const items = MainCaroselData.map((item) => (
    <div className="w-full h-[80vh] overflow-hidden">
      <img
        className="w-full h-full object-cover cursor-pointer"
        role="presentation"
        src={item.image}
        alt="banner"
      />
    </div>
  ));

  return (
    <AliceCarousel
      items={items}
      disableButtonsControls
      autoPlay
      autoPlayInterval={1000}
      infinite
    />
  );
};

export default MainCarosel;