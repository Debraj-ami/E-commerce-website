import React, { useRef, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import Button from "@mui/material/Button";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const HomeSectionCarosel = ({ data , sectionName}) => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsToShow = 5;

  const responsive = {
    0: { items: 1 },
    720: { items: 3 },
    1024: { items: itemsToShow },
  };

  const items = data.map((item) => (
    <HomeSectionCard key={item.imageUrl} product={item} />
  ));

  const maxIndex = data.length - itemsToShow;

  return (
    <div className="border">
      <h2 className="w-full text-left text-2xl font-extrabold text-gray-800 ">{sectionName}</h2>
      <div className="relative p-5">
        <AliceCarousel
          ref={carouselRef}
          items={items}
          responsive={responsive}
          disableDotsControls
          disableButtonsControls
          mouseTracking
          onSlideChanged={({ item }) => setCurrentIndex(item)}
        />

        {/* NEXT BUTTON */}
        {currentIndex < maxIndex && (
          <Button
            onClick={() => carouselRef.current?.slideNext()}
            sx={{
              position: "absolute",
              top: "8rem",
              right: "0",
              transform: "translateX(50%) rotate(90deg)",
              bgcolor: "silver"
            }}
          >
            <ChevronLeftIcon sx={{ transform: "rotate(90deg)" }} />
          </Button>
        )}

        {/* PREV BUTTON */}
        {currentIndex > 0 && (
          <Button
            onClick={() => carouselRef.current?.slidePrev()}
            sx={{
              position: "absolute",
              top: "8rem",
              left: "0",
              transform: "translateX(-50%) rotate(-90deg)",
              bgcolor: "silver"
            }}
          >
            <ChevronLeftIcon sx={{ transform: "rotate(90deg)" }} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default HomeSectionCarosel;