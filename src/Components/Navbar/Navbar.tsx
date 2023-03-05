import React from "react";
import "./Styles.scss";
import { useState } from "react";
import AuthContext from "../context/AuthProvider.tsx";
import { useContext } from "react";
import { useNavigate } from "react-router";
import logo from "../../Icons/mdi_car-wrench.svg";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from "@heroicons/react/20/solid";
const jwt = require("jsonwebtoken");

const Navbar = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const isAuth = auth;

  const logout = () => {
    const token = localStorage.getItem("token");
    localStorage.clear();
    navigate("/");
  };
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <section className="navigation bg-gray-300">
      <div className="nav-container">
        <div className="brand">
          <div className="sm mt-8 flex mx-auto">
            <a href="/" className="flex items-center">
              <img
                src={logo}
                className="bg-blue-200 rounded-full h-8 mr-3"
                alt="AutoFix Solutions Logo"
              />
              <span className="self-center text-lg lg:text-2xl font-semibold whitespace-nowrap text-gray-700">
                AutoFix Solutions
              </span>
            </a>
          </div>
        </div>
        <nav>
          <div className="nav-mobile">
            <button id="nav-toggle" onClick={() => setMobileMenuOpen(true)}>
              <span></span>
            </button>
          </div>
          <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
            <div className="fixed inset-0 z-10" />
            <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <a href="/" className="sm:hidden flex mx-auto">
                  <img className="h-8 w-auto rounded-full bg-blue-200" src={logo} alt="" />
                  <span className="ml-2 mt-1 text-lg uppercase text-semibold">
                    AutoFix Solutions
                  </span>
                </a>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700 sm:ml-72"
                  onClick={() => setMobileMenuOpen(false)}>
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="text-center mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-900/20">
                  <div className="space-y-2 py-6">
                    <a
                      href="/"
                      className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                      Home
                    </a>
                    <a
                      href="/#about"
                      className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                      About
                    </a>
                    <a
                      href="/#services"
                      className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                      Services
                    </a>
                    <a
                      href="/#team"
                      className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                      Team
                    </a>
                    <a
                      href="/#contact"
                      className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                      Contact
                    </a>
                  </div>
                  <div>
                    {!isAuth && (
                      <>
                        <li>
                          <a
                            className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            href="/login">
                            Sign in
                          </a>
                        </li>
                        <li>
                          <a
                            className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            href="/register">
                            Sign up
                          </a>
                        </li>
                      </>
                    )}
                    {isAuth && (
                      <>
                        <li className="list-none">
                          <a
                            className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            href="/dashboard/">
                            Dashboard
                          </a>
                        </li>
                        <li className="list-none" onClick={logout}>
                          <a
                            href=""
                            className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                            Logout
                          </a>
                        </li>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Dialog>
          <ul className="nav-list lg:text-base text-sm">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#team">Team</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
            {!isAuth && (
              <>
                <li>
                  <a href="/login">Sign in</a>
                </li>
                <li>
                  <a href="/register">Sign up</a>
                </li>
              </>
            )}
            {isAuth && (
              <>
                <li>
                  <a href="/dashboard/">Dashboard</a>
                </li>
                <li onClick={logout}>
                  <a href="">Logout</a>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default Navbar;
