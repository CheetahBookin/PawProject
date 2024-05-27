"use client"
import React, { useState } from 'react';
import Newsletter from "@/components/layout/newsletter";

function Footer() {
  const [showNewsletter, setShowNewsletter] = useState(false);
  return (
    <footer className="px-3 pt-4 lg:px-9 border-t-2 bg-brand-primary dark:bg-brand-primary-dark">
      <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">

        <div className="sm:col-span-2">
          <a href="#" className="inline-flex items-center">
            <span className="text-xl font-bold tracking-wide text-gray-800 dark:text-gray-400">CheetahBooking</span>
          </a>
          <div className="mt-6 lg:max-w-xl">
            <p className="text-sm text-gray-800 dark:text-font-dark-mode">
              CheetahBooking is a leading accommodation booking platform that connects travelers with a diverse range of lodging options worldwide. Our platform offers a seamless experience for users to discover, compare, and book accommodations tailored to their preferences and budget. Whether it's hotels, vacation rentals, or hostels, CheetahBooking provides a hassle-free solution for travelers to find their ideal stay, ensuring a smooth and enjoyable journey every step of the way.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <p className="text-base font-bold tracking-wide text-gray-900 dark:text-gray-400">Customer Service</p>
          <a href="#" onClick={() => setShowNewsletter(true)} className='dark:text-font-dark-mode'>Newsletter</a>
          <a href="#" className='dark:text-font-dark-mode'>Terms & Conditions</a>
          <a href="#" className='dark:text-font-dark-mode'>Customer Service help</a>
          <a href="#" className='dark:text-font-dark-mode'>Customer Partner help</a>
          <p className="text-base font-bold tracking-wide text-gray-900 dark:text-gray-400">Social Media</p>
          <div className="flex items-center gap-2">
            <a href="https://github.com/CheetahBookin/PawProject" className="dark:hover:text-brand-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 dark:text-font-dark-mode"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a href="https://www.facebook.com" className="hover:text-brand-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 dark:text-font-dark-mode"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
            <a href="https://www.messenger.com" className="hover:text-brand-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 dark:text-font-dark-mode"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.627 0-12 4.975-12 11.111 0 3.497 1.745 6.616 4.472 8.652v4.237l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.974 12-11.111 0-6.136-5.373-11.111-12-11.111zm1.193 14.963l-3.056-3.259-5.963 3.259 6.559-6.963 3.13 3.259 5.889-3.259-6.559 6.963z" />
              </svg>
            </a>
          </div>
        </div>


        <div>
          <p className="text-base font-bold tracking-wide text-gray-900 dark:text-gray-400">CHEETAHBOOKING IS ALSO AVAILABLE ON</p>
          <div className="flex items-center gap-1 px-2">
            <a href="#" className="w-full min-w-xl">
              <img src="https://www.svgrepo.com/show/303139/google-play-badge-logo.svg" alt="Playstore Button" className="h-10" />
            </a>
            <a className="w-full min-w-xl" href="#">
              <img src="https://www.svgrepo.com/show/303128/download-on-the-app-store-apple-logo.svg" alt="Applestore Button" className="h-28" />
            </a>
          </div>
          <p className="text-base font-bold tracking-wide text-gray-900 dark:text-gray-400">Contacts</p>
          <div className="flex">
            <p className="mr-1 text-gray-800 dark:text-gray-400">Email:</p>
            <a href="#" title="send email" className='dark:text-font-dark-mode'>jakub.bilski@uczen.zsk.poznan.pl</a>
          </div>
        </div>

      </div>

      <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t dark:border-t-gray-400 lg:flex-row">
        <p className="text-sm text-gray-600 dark:text-font-dark-mode">© 2024 CheetahBooking. All rights reserved.</p>
        <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
          <li>
            <a href="#" className="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400 dark:text-font-dark-mode">Privacy &amp; Cookies Policy</a>
          </li>
          <li>
            <a href="#" className="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400 dark:text-font-dark-mode">Disclaimer</a>
          </li>
        </ul>
      </div>
      {showNewsletter && <Newsletter />}
    </footer>
  );
}

export default Footer;
