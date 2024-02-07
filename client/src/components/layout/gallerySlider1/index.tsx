"use client"
import React, { useState, useEffect } from 'react';

function GallerySlider1() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  function nextSlide() {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % 3);
  }

  return (
    <div className="max-w-1000px mx-auto relative slideshow-container">
      <div className="mySlides fade" style={{ display: currentSlide === 0 ? 'block' : 'none' }}>
        <div className="numbertext">1 / 3</div>
        <img src="//zdjęcie z bazy" style={{ width: '100%' }} alt="" />
        <div className="text">Nazwa destynacji #1</div>
      </div>

      <div className="mySlides fade" style={{ display: currentSlide === 1 ? 'block' : 'none' }}>
        <div className="numbertext">2 / 3</div>
        <img src="//zdjęcie z bazy" style={{ width: '100%' }} alt="" />
        <div className="text">Nazwa destynacji #2</div>
      </div>

      <div className="mySlides fade" style={{ display: currentSlide === 2 ? 'block' : 'none' }}>
        <div className="numbertext">3 / 3</div>
        <img src="//zdjęcie z bazy" style={{ width: '100%' }} alt="" />
        <div className="text">Nazwa destynacji #3</div>
      </div>

      <div className="text-center">
        <span className={`dot ${currentSlide === 0 ? 'active' : ''}`}></span>
        <span className={`dot ${currentSlide === 1 ? 'active' : ''}`}></span>
        <span className={`dot ${currentSlide === 2 ? 'active' : ''}`}></span>
      </div>
    </div>
  );
}

export default GallerySlider1;
