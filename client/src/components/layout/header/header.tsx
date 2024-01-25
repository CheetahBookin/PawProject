import React from 'react';

function Header() {
  return (
    <header className="lg:px-16 px-4 flex flex-wrap items-center py-4 shadow-md" style={{ backgroundColor: "#D89340" }}>
      <nav className="flex-1 flex justify-between items-center">
        <a href="/">
          <img src="/cheetahbooking-high-resolution-logo.png" alt="logo" className="w-56" />
        </a>

        <div className="hidden md:flex md:items-center md:w-auto w-full" id="menu">
          <ul className="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
            <li><a className="md:p-4 py-3 px-0 block" href="#destinations">Destinations</a></li>
            <li><a className="md:p-4 py-3 px-0 block" href="#pln">PLN</a></li>
            <li><a className="md:p-4 py-3 px-0 block" href="#account">Konto</a></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;

