import Link from 'next/link'
import React from 'react'

function About() {
  return (
    <main className="bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full transition transform hover:scale-105 duration-500">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-6 animate-bounce">About CheetahBooking</h1>
        <p className="text-gray-700 text-lg mb-4">
          CheetahBooking is a leading company in booking hotels located in Poland. Our headquarters are situated at Fredry 13, Poznań. We are committed to providing the best hotel booking experience with a wide range of options and excellent customer service.
        </p>
        <p className="text-gray-700 text-lg mb-4">
          Our platform offers a seamless and efficient way to book hotels, ensuring that your stay is comfortable and memorable. With years of experience in the industry, CheetahBooking stands out for its reliability and customer satisfaction.
        </p>
        <div className="mt-8">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transform hover:scale-110 transition duration-300 ease-in-out">
            <Link href='/destinations'>Explore our offer!</Link>
          </button>
        </div>
        <div className="mt-8">
          <h2 className="text-4xl font-bold text-center text-blue-600 mb-6 animate-bounce">Contact Us</h2>
          <p className="text-gray-700 text-lg mb-4">For inquiries, reach out to us using the following contact details:</p>
          <ul className="list-disc pl-6">
            <li className="text-gray-700 mb-2">Email: cheetahBooking1@gmail.com</li>
            <li className="text-gray-700 mb-2">Phone: +48 123 456 789</li>
            <li className="text-gray-700 mb-2">Address: Fredry 13, Poznań, Poland</li>
          </ul>
        </div>
      </div>
    </main>
  )
}

export default About
