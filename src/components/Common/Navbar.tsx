import React from "react";
import { HiOutlineShoppingBag, HiOutlineUser } from "react-icons/hi";
import { HiBars3BottomRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = React.useState(false);

  const toggleNavDrawer = () => setNavDrawerOpen(!navDrawerOpen);
  const toggleCartDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        <div>
          <Link to="/" className="text-2xl font-medium">
            Transilk
          </Link>
        </div>

        {/* Center Navigation Links */}
        <div className="hidden md:flex space-x-6">
          {["Stones", "Jewelleries", "Collections", "Support", "Journey"].map((item) => (
            <Link
              key={item}
              to="#"
              className="text-[#124559] hover:text-[#01161e] text-sm font-medium uppercase"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-4">
          <Link to="/profile" className="hover:text-[#01161e]">
            <HiOutlineUser className="h-6 w-6 text-[#124559]" />
          </Link>

          {/* Cart Button */}
          <button
            onClick={toggleCartDrawer}
            className="relative hover:text-[#01161e]"
            type="button"
            aria-label="View shopping bag"
          >
            <HiOutlineShoppingBag className="h-6 w-6 text-[#124559]" />
            <span className="absolute -top-1 -right-0.5 bg-[#124559] text-white text-xs rounded-full px-2 py-0.5">
              4
            </span>
          </button>

          {/* Search */}
          <div className="overflow-hidden">
            <SearchBar />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={toggleNavDrawer}
              aria-expanded={navDrawerOpen ? true : false}
              aria-controls="mobile-menu"
            >
              <HiBars3BottomRight className="h-6 w-6 text-[#124559]" />
            </button>
          </div>
        </div>
      </nav>

      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile Navigation Drawer */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-0 z-40 transition ${
          navDrawerOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* BACKDROP */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-200 ${
            navDrawerOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={toggleNavDrawer}
          aria-hidden="true"
        />

        {/* DRAWER PANEL */}
        <div
          className={`absolute top-0 left-0 h-full w-3/4 sm:w-1/2 bg-white shadow-xl transform transition-transform duration-300 ${
            navDrawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-6 space-y-4">
            {["Stones", "Jewelleries", "Collections", "Support", "Journey"].map((item) => (
              <Link
                key={item}
                to="#"
                className="block text-[#124559] hover:text-[#01161e] text-sm font-medium uppercase"
                onClick={toggleNavDrawer}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
