import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="w-full bg-gray-600 text-white shadow-md sticky top-0">
      <nav className="max-w-6xl mx-auto flex justify-between items-center px-6 py-3">
        
        {/* Logo */}
        <img
          className="rounded-full"
          width="50"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV_sIfls9_5tJwjfXi-kknOqkSe10H0OtmOQ&s"
          alt="logo"
        />

        {/* Navigation Links */}
        <ul className="flex gap-8 text-lg">
          <li>
            <NavLink to="/" className="hover:text-yellow-300">
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/products" className="hover:text-yellow-300">
              Products
            </NavLink>
          </li>

          <li>
            <NavLink to="/contact" className="hover:text-yellow-300">
              Contact
            </NavLink>
          </li>
        </ul>

      </nav>
    </header>
  );
}

export default Header;