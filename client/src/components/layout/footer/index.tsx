import React from 'react';

function Footer() {
  return (
    <footer className="px-3 pt-4 lg:px-9 border-t-2 bg-brand-primary">
      <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">

        <div className="sm:col-span-2">
          <a href="#" className="inline-flex items-center">
            <img src="/cheetahbooking-high-resolution-logo.png" alt="logo" className="h-8 w-8" />
            <span className="ml-2 text-xl font-bold tracking-wide text-gray-800">CheetahBooking</span>
          </a>
          <div className="mt-6 lg:max-w-xl">
            <p className="text-sm text-gray-800">
            CheetahBooking is a leading accommodation booking platform that connects travelers with a diverse range of lodging options worldwide. Our platform offers a seamless experience for users to discover, compare, and book accommodations tailored to their preferences and budget. Whether it's hotels, vacation rentals, or hostels, CheetahBooking provides a hassle-free solution for travelers to find their ideal stay, ensuring a smooth and enjoyable journey every step of the way.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <p className="text-base font-bold tracking-wide text-gray-900">Popular Hotels</p>
          <a href="#">Beachfront Paradise Resort</a>
          <a href="#">Urban Chic Boutique Hotel</a>
          <a href="#">Mountain Retreat Lodge</a>
          <p className="text-base font-bold tracking-wide text-gray-900">Top Destinations</p>
          <a href="#">City Center Suites</a>
          <a href="#">Coastal Villas</a>
          <a href="#">Ski Chalets</a>
      </div>


        <div>
          <p className="text-base font-bold tracking-wide text-gray-900">CHEETAHBOOKING IS ALSO AVAILABLE ON</p>
          <div className="flex items-center gap-1 px-2">
            <a href="#" className="w-full min-w-xl">
              <img src="https://www.svgrepo.com/show/303139/google-play-badge-logo.svg" alt="Playstore Button" className="h-10" />
            </a>
            <a className="w-full min-w-xl" href="#">
              <img src="https://www.svgrepo.com/show/303128/download-on-the-app-store-apple-logo.svg" alt="Applestore Button" className="h-28" />
            </a>
          </div>
          <p className="text-base font-bold tracking-wide text-gray-900">Contacts</p>
          <div className="flex">
            <p className="mr-1 text-gray-800">Email:</p>
            <a href="#" title="send email">jakub.bilski@uczen.zsk.poznan.pl</a>
          </div>
        </div>

      </div>

      <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row">
        <p className="text-sm text-gray-600">© Copyright 2024 CheetahBooking. All rights reserved.</p>
        <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
          <li>
            <a href="#" className="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400">Privacy &amp; Cookies Policy</a>
          </li>
          <li>
            <a href="#" className="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400">Disclaimer</a>
          </li>
        </ul>
      </div>

    </footer>
  );
}

export default Footer;

