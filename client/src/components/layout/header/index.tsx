import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const currency = [
    { value: "PLN", label: "PLN" },
    { value: "USD", label: "USD" },
    { value: "EUR", label: "EUR" },
    { value: "GBP", label: "GBP" },
    { value: "AUD", label: "AUD" },
    { value: "CAD", label: "CAD" },
    { value: "JPY", label: "JPY" },
    { value: "CNY", label: "CNY" },
    { value: "KRW", label: "KRW" },
    { value: "SGD", label: "SGD" }
  ]
  return (
    <header className="lg:px-16 flex py-4 shadow-md justify-between bg-brand-primary">
      <Link href="/">
          <img src="/cheetahbooking-high-resolution-logo.png" alt="logo" className="w-56" />
      </Link>
      <nav className="flex-1 flex justify-end">
        <div className="hidden md:flex md:items-center md:w-auto w-full" id="menu">
          <ul className="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0 gap-12">
            <li><Link className="block" href="/destinations">Destinations</Link></li>
            <li>
              <select className="appearance-none bg-brand-secondary border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                {currency.map((item, index) => (
                  <option key={index} value={item.value}>{item.label}</option>
                ))}
              </select>
            </li>
            <li><Link className="block" href="/login"><FontAwesomeIcon icon={faUser} className="w-6"/></Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;