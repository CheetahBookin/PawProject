"use client"
import React from 'react';

function GalleryPropertyType() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-4">Browse by property type</h2>
      <div className="flex flex-wrap justify-center">
        <div className="relative w-72 h-72 flex items-center justify-center mx-4 my-4">
          <img src="https://r-xx.bstatic.com/xdata/images/xphoto/263x210/57584488.jpeg?k=d8d4706fc72ee789d870eb6b05c0e546fd4ad85d72a3af3e30fb80ca72f0ba57&o=" alt="Hotels" className="w-full h-full" />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-500">
            <p className="text-white text-lg">Hotels</p>
          </div>
        </div>

        <div className="relative w-72 h-72 flex items-center justify-center mx-4 my-4">
          <img src="https://q-xx.bstatic.com/xdata/images/hotel/263x210/119467716.jpeg?k=f3c2c6271ab71513e044e48dfde378fcd6bb80cb893e39b9b78b33a60c0131c9&o=" alt="Aparments" className="w-full h-full" />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-500">
            <p className="text-white text-lg">Apartments</p>
          </div>
        </div>

        <div className="relative w-72 h-72 flex items-center justify-center mx-4 my-4">
          <img src="https://r-xx.bstatic.com/xdata/images/xphoto/263x210/57584488.jpeg?k=d8d4706fc72ee789d870eb6b05c0e546fd4ad85d72a3af3e30fb80ca72f0ba57&o=" alt="Villas" className="w-full h-full" />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-500">
            <p className="text-white text-lg">Villas</p>
          </div>
        </div>

        <div className="relative w-72 h-72 flex items-center justify-center mx-4 my-4">
          <img src="https://r-xx.bstatic.com/xdata/images/xphoto/263x210/45450084.jpeg?k=f8c2954e867a1dd4b479909c49528531dcfb676d8fbc0d60f51d7b51bb32d1d9&o=" alt="Resorts" className="w-full h-full" />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-500">
            <p className="text-white text-lg">Resorts</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GalleryPropertyType;
