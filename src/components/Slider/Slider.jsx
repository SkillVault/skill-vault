import React, { useState, useEffect } from "react";
import "./Slider.css";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/src/assets/slider1.png",
      altText: "Unlock hidden potential you never knew existed.",
    },
    {
      image: "/src/assets/slider2.png",
      altText: "Connect with top employers and land your dream job.",
    },
    {
      image: "/src/assets/slider3.png",
      altText: "Start your skills journey today!",
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [slides.length, currentSlide]);

  return (
    <div className="slider-container">
      <div className="slider">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? "active" : ""}`}
          >
            <img src={slide.image} alt={slide.altText} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
