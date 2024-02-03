import React from 'react';
import Link from "next/link";

function Header() {
  return (
    <header className="lg:px-16 flex py-4 shadow-md justify-between" style={{ backgroundColor: "#D89340" }}>
      <Link href="/">
          <img src="/cheetahbooking-high-resolution-logo.png" alt="logo" className="w-56" />
      </Link>
      <nav className="flex-1 flex justify-end">
        <div className="hidden md:flex md:items-center md:w-auto w-full" id="menu">
          <ul className="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0 gap-12">
            <li><Link className="block" href="/destinations">Destinations</Link></li>
            <li><button className="block">PLN</button></li>
            <li><Link className="block" href="/dashboard">Konto</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;