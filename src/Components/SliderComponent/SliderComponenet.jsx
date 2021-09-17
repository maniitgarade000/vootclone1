import React, { Fragment } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const SliderComponent = () => {
  return (
    <Fragment>
      <Carousel infiniteLoop centerMode autoPlay>
        <div>
          <img src="first.jpg" alt="first" />
          <p className="legend">Legend 1</p>
        </div>
        <div>
          <img src="second.jpg" alt="second" />
          <p className="legend">Legend 2</p>
        </div>
        <div>
          <img src="third.jpg" alt="third" />
          <p className="legend">Legend 3</p>
        </div>
      </Carousel>
    </Fragment>
  );
};

export default SliderComponent;