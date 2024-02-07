"use client"
import React, { useState } from 'react';

function GalleryPopularDestinations() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedImgSrc, setExpandedImgSrc] = useState('');
  const [expandedImgAlt, setExpandedImgAlt] = useState('');

  function showImage(imgSrc: string, imgAlt: string) {
    setExpandedImgSrc(imgSrc);
    setExpandedImgAlt(imgAlt);
    setIsExpanded(true);
  }

  function closeExpandedImage() {
    setIsExpanded(false);
  }

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold">Popular Destinations</h2>
      <div className="flex justify-center mt-8">
        <div className="w-1/4 px-4">
          <img
            src="https://cf.bstatic.com/xdata/images/city/354x266/972536.jpg?k=fc90a871db0baae4bd8b649d9624809eaceee5f4ef218f09d158c8fe8d6d6abe&o="
            alt="Destination"
            style={{ width: '300px', height: '300px' }}
            className="cursor-pointer opacity-80 hover:opacity-100"
            onClick={() => showImage('https://cf.bstatic.com/xdata/images/city/354x266/972536.jpg?k=fc90a871db0baae4bd8b649d9624809eaceee5f4ef218f09d158c8fe8d6d6abe&o=', 'Destination')}
          />
        </div>
        <div className="w-1/4 px-4">
          <img
            src="https://cf.bstatic.com/xdata/images/xphoto/300x240/140037189.jpg?k=6e942c9f13f65f35ff32d315da2a6c9b0fe16bf001c02a663b41125dac491b71&o="
            alt="Destination"
            style={{ width: '300px', height: '300px' }}
            className="cursor-pointer opacity-80 hover:opacity-100"
            onClick={() => showImage('https://cf.bstatic.com/xdata/images/xphoto/300x240/140037189.jpg?k=6e942c9f13f65f35ff32d315da2a6c9b0fe16bf001c02a663b41125dac491b71&o=', 'Destination')}
          />
        </div>
        <div className="w-1/4 px-4">
          <img
            src="https://cf.bstatic.com/xdata/images/hotel/max300/491351463.webp?k=b14baa0b0d3dd246d82628f3ff12bc59645cc27bb3873b9d221733b28b776921&o="
            alt="Destination"
            style={{ width: '300px', height: '300px' }}
            className="cursor-pointer opacity-80 hover:opacity-100"
            onClick={() => showImage('https://cf.bstatic.com/xdata/images/hotel/max300/491351463.webp?k=b14baa0b0d3dd246d82628f3ff12bc59645cc27bb3873b9d221733b28b776921&o=', 'Destination')}
          />
        </div>
        <div className="w-1/4 px-4">
          <img
            src="https://cf.bstatic.com/xdata/images/hotel/max300/485680969.webp?k=0559e7684d742d91449e4a493dc68c42580cfceabe2450448f0646fe87cb938c&o="
            alt="USA"
            style={{ width: '300px', height: '300px' }}
            className="cursor-pointer opacity-80 hover:opacity-100"
            onClick={() => showImage('https://cf.bstatic.com/xdata/images/hotel/max300/485680969.webp?k=0559e7684d742d91449e4a493dc68c42580cfceabe2450448f0646fe87cb938c&o=', 'USA')}
          />
        </div>
      </div>

      
      {isExpanded && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50">
          <span
            className="absolute top-4 right-8 text-white text-4xl cursor-pointer"
            onClick={closeExpandedImage}
          >
            &times;
          </span>
          <img src={expandedImgSrc} style={{ width: '80%' }} />
          <div className="absolute bottom-8 left-8 text-white text-xl">{expandedImgAlt}</div>
        </div>
      )}
    </div>
  );
}

export default GalleryPopularDestinations;
