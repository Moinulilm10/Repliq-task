import { Store } from "@/utils/Store";
import Head from "next/head";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signOut, useSession } from "next-auth/react";
import { Menu } from "@headlessui/react";
import DropdownLink from "./DropdownLink";
import Cookies from "js-cookie";
import Image from "next/image";

export default function Layout({ title, children }) {
  const { status, data: session } = useSession();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  // logout click handler
  const logoutClickHandler = () => {
    Cookies.remove("cart");
    dispatch({ type: "CART_RESET" });
    signOut({ callbackUrl: "/login" });
  };

  return (
    <>
      <Head>
        <title>{title ? title + " - Amazona" : "Amazona"}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />

      <div className="flex min-h-screen flex-col justify-between ">
        <header>
          <nav className="flex h-12 items-center px-4 justify-between shadow-md">
            <Link legacyBehavior href="/">
              <a className="text-lg font-bold mr-6">Shopiffy</a>
            </Link>
            <div>
              <Link legacyBehavior href="/cart">
                <a className="p-2">
                  Cart
                  {cartItemsCount > 0 && (
                    <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                      {cartItemsCount}
                    </span>
                  )}
                </a>
              </Link>
              {status === "loading" ? (
                "Loading"
              ) : session?.user ? (
                // session.user.name
                // add user menu
                <Menu as="div" className="relative inline-block">
                  <Menu.Button className="text-blue-600">
                    {session.user.name}
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white  shadow-lg ">
                    <Menu.Item>
                      <DropdownLink className="dropdown-link" href="/profile">
                        Profile
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <DropdownLink
                        className="dropdown-link"
                        href="/order-history"
                      >
                        Order History
                      </DropdownLink>
                    </Menu.Item>
                    {/* admin dashboard */}
                    {session.user.isAdmin && (
                      <Menu.Item>
                        <DropdownLink
                          className="dropdown-link"
                          href="/admin/dashboard"
                        >
                          Admin Dashboard
                        </DropdownLink>
                      </Menu.Item>
                    )}
                    <Menu.Item>
                      <a
                        className="dropdown-link"
                        href="#"
                        onClick={logoutClickHandler}
                      >
                        Logout
                      </a>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link legacyBehavior href="/login">
                  <a className="p-2">Login</a>
                </Link>
              )}
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        {/* <footer className="flex h-10 justify-center items-center shadow-inner">
          <p>Copyright © 2022 Amazona</p>
        </footer> */}
        <footer className="bg-gray-800 py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-between">
              <div className="w-full md:w-1/3 lg:w-1/4 mb-4">
                <h2 className="text-white text-lg font-bold mb-2">
                  Company Name
                </h2>
                <p className="text-gray-400">shoppify</p>
              </div>
              <div className="w-full md:w-1/3 lg:w-1/4 mb-4">
                <h2 className="text-white text-lg font-bold mb-2">
                  Quick Links
                </h2>
                <ul>
                  <li>
                    <Link legacyBehavior href="/about">
                      <a className="text-gray-400 hover:text-white">About</a>
                    </Link>
                  </li>
                  <li>
                    <Link legacyBehavior href="/services">
                      <a className="text-gray-400 hover:text-white">Services</a>
                    </Link>
                  </li>
                  <li>
                    <Link legacyBehavior href="/blog">
                      <a className="text-gray-400 hover:text-white">Blog</a>
                    </Link>
                  </li>
                  <li>
                    <Link legacyBehavior href="/contact">
                      <a className="text-gray-400 hover:text-white">Contact</a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="w-full md:w-1/3 lg:w-1/4 mb-4">
                <h2 className="text-white text-lg font-bold mb-2">
                  Social Media
                </h2>
                <ul>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      LinkedIn
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-gray-900 py-4">
            <div className="container mx-auto px-4">
              <p className="text-center text-gray-400">
                &copy; {new Date().getFullYear()} Company Name. All Rights
                Reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
