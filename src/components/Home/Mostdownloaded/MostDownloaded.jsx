import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DownloadCard from "./DownloadCard";

const MostDownloaded = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [indicators, setIndicators] = useState([]);

  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    scroll: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    beforeChange: (current, next) => {
      setCurrentSlide(next);
    },
  };

  useEffect(() => {
    const slideCount = document.querySelectorAll(".slick-slide").length;
    const indicatorsArray = [];
    for (let i = 0; i < slideCount; i++) {
      indicatorsArray.push(
        <div
          key={i}
          className={`indicator ${i === currentSlide ? "active" : ""}`}
          onClick={() => handleIndicatorClick(i)}
        ></div>
      );
    }
    setIndicators(indicatorsArray);
  }, [currentSlide]);

  const handleIndicatorClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="container-fluid most-search">
      <div className="container py-5">
        <div class="row">
          <div class="download-container col-lg-5">
            {/* <img class="lens-icon" src="./assets/frame-50-mWh.png" alt="..."/> */}
            <div class="text-overlay">
              <p class="most-search-heading">Most Downloaded</p>
              <p class="most-search-text">
                Check out what people have been downloading the most
              </p>
            </div>
          </div>
          <div class="col-lg-7"></div>
        </div>
        <div className="">
          <DownloadCard settings={settings} indicators={indicators} />
        </div>
      </div>
    </div>
  );
};

export default MostDownloaded;
