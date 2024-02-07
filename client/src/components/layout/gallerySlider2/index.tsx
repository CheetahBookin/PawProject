"use client"
import React, { useState, useEffect } from 'react';

function GallerySlider2() {
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
        <img src="https://cf.bstatic.com/xdata/images/hotel/square600/412586827.webp?k=0b0fbd8db708ad7b7404510487453332a02cecf7b44386501279f98a871ee8c5&o=" style={{ width: '100%' }} alt="" />
        <div className="text">Nazwa Hotelu #1</div>
      </div>

      <div className="mySlides fade" style={{ display: currentSlide === 1 ? 'block' : 'none' }}>
        <div className="numbertext">2 / 3</div>
        <img src="https://cf.bstatic.com/xdata/images/hotel/square600/520270808.webp?k=449901cdbcd3f7ec3cb227b0aef29aba19d7ad0ab2f6b8383aa1eb253719d5be&o=" style={{ width: '100%' }} alt="" />
        <div className="text">Nazwa Hotelu #2</div>
      </div>

      <div className="mySlides fade" style={{ display: currentSlide === 2 ? 'block' : 'none' }}>
        <div className="numbertext">3 / 3</div>
        <img src="https://cf.bstatic.com/xdata/images/hotel/square600/189854319.webp?k=a2122f32c33c26cb7f2faaa96a507fcc81839143dc4fcc746939b48e874e8c6f&o=" style={{ width: '100%' }} alt="" />
        <div className="text">Nazwa Hotelu #3</div>
      </div>

      <div className="text-center">
        <span className={`dot ${currentSlide === 0 ? 'active' : ''}`}></span>
        <span className={`dot ${currentSlide === 1 ? 'active' : ''}`}></span>
        <span className={`dot ${currentSlide === 2 ? 'active' : ''}`}></span>
      </div>
    </div>
  );
}

export default GallerySlider2;
