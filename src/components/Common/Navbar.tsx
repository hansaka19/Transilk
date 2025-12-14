import React from "react";
import { HiOutlineShoppingBag, HiOutlineUser } from "react-icons/hi";
import { HiBars3BottomRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = React.useState(false);
  const { items } = useCart();

  const toggleNavDrawer = () => setNavDrawerOpen(!navDrawerOpen);
  const toggleCartDrawer = () => setDrawerOpen(!drawerOpen);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

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
          {[
            { label: "Stones", to: "/stones" },
            { label: "Jewelleries", to: "/jewelleries" },
            { label: "Collections", to: "/collections" },
            { label: "Support", to: "/support" },
            { label: "Journey", to: "/journey" },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="text-gray-800 hover:text-gray-900 text-sm font-medium uppercase"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-4">
          <Link to="/profile" className="hover:text-gray-900">
            <HiOutlineUser className="h-6 w-6 text-gray-800" />
          </Link>

          {/* Cart Button */}
          <button
            onClick={toggleCartDrawer}
            className="relative hover:text-gray-900"
            type="button"
            aria-label="View shopping bag"
          >
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-800" />
            <span className="absolute -top-1 -right-0.5 bg-gray-900 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
              {itemCount}
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
              <HiBars3BottomRight className="h-6 w-6 text-gray-800" />
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
            {[
              { label: "Stones", to: "/stones" },
              { label: "Jewelleries", to: "/jewelleries" },
              { label: "Collections", to: "/collections" },
              { label: "Support", to: "/support" },
              { label: "Journey", to: "/journey" },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="block text-gray-800 hover:text-gray-900 text-sm font-medium uppercase"
                onClick={toggleNavDrawer}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
