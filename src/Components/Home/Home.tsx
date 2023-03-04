import * as React from "react";
import * as ReactDOM from "react-dom";
import Navbar from "../Navbar/Navbar.tsx";
import Footer from "../Footer/Footer.tsx";
import logo from "./logo.svg";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import bgVideo from "../../Videos/production ID_4489804.mp4";
import {
  ClipboardDocumentCheckIcon,
  ChevronDownIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ArrowUpIcon
} from "@heroicons/react/24/outline";
import { Switch } from "@headlessui/react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import team1 from "../../Images/team1.jpg";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function App() {
  const [agreed, setAgreed] = useState(false);

  const services = [
    {
      name: "Diagnostic",
      description:
        "Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.",
      icon: ClipboardDocumentCheckIcon
    },
    {
      name: "Diagnostic",
      description:
        "Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.",
      icon: ClipboardDocumentCheckIcon
    },
    {
      name: "Diagnostic",
      description:
        "Quisque est vel vulputate cursus. Risus proin diam nunc commodo. Lobortis auctor congue commodo diam neque.",
      icon: ClipboardDocumentCheckIcon
    },
    {
      name: "Diagnostic",
      description:
        "Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.",
      icon: ClipboardDocumentCheckIcon
    },
    {
      name: "Diagnostic",
      description:
        "Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.",
      icon: ClipboardDocumentCheckIcon
    },
    {
      name: "Diagnostic",
      description:
        "Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.",
      icon: ClipboardDocumentCheckIcon
    }
  ];
  const stats = [
    { id: 1, name: "Satisfied clients", value: "580" },
    { id: 2, name: "Completed projects", value: "1200" },
    { id: 3, name: "Years experience", value: "10+" }
  ];
  const people = [
    {
      name: "Leslie Alexander",
      role: "CEO",
      imageUrl: team1
    },
    {
      name: "Leslie Alexander",
      role: "CEO",
      imageUrl: team1
    },
    {
      name: "Leslie Alexander",
      role: "CEO",
      imageUrl: team1
    },
    {
      name: "Leslie Alexander",
      role: "CEO",
      imageUrl: team1
    },
    {
      name: "Leslie Alexander",
      role: "CEO",
      imageUrl: team1
    },
    {
      name: "Leslie Alexander",
      role: "CEO",
      imageUrl: team1
    }
  ];
  const contact = [
    {
      name: "Phone",
      description: "egestas a elementum pulvinar et feugiat blandit.",
      info: "+122 413 523 123",
      icon: PhoneIcon
    },
    {
      name: "Email",
      description: "egestas a elementum pulvinar et feugiat blandit.",
      info: "example@example.com",
      icon: EnvelopeIcon
    },
    {
      name: "Location",
      description: "egestas a elementum pulvinar et feugiat blandit.",
      info: "example",
      icon: MapPinIcon
    }
  ];
  const reviews = [
    {
      name: "John Dee",
      review: "Awesome service!",
      img: team1
    },
    {
      name: "Simon Vincent",
      review: "Great exprience!",
      img: team1
    },
    {
      name: "Tom Walton",
      review: "Fast, cheap and professional service!",
      img: team1
    }
  ];
  const toTop = document.getElementById("toTop");
  window.onscroll = function () {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      toTop.classList.remove("hidden");
    } else {
      toTop.classList.add("hidden");
    }
  };
  function goToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return (
    <div>
      <Navbar />
      <main>
        <div id="top" className="relative">
          <div
            className="flex items-center
        justify-center h-screen overflow-hidden">
            <video
              className="absolute brightness-50 top-0 left-0 z-0 pointer-events-none overflow-hidden"
              muted
              autoPlay
              loop>
              <source src={bgVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="mx-auto absolute max-w-2xl py-32 sm:py-48 lg:py-56">
              <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                    Best Car Repairing Services & More
                  </h1>
                  <p className="mt-6 text-lg leading-8 text-gray-300">
                    Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat
                    commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
                  </p>
                  <div className="mt-10 flex items-center justify-center gap-x-6">
                    <a
                      href="/#contact"
                      className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      Contact us
                    </a>
                    <a href="/#services" className="text-sm font-semibold leading-6 text-white">
                      Learn more <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">
                About Our Company
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                How We Can Help You
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget
                egestas a elementum pulvinar et feugiat blandit at. In mi viverra elit nunc.
              </p>
            </div>
          </div>
        </div>
        <div id="services" className="bg-gray-200 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">What We Do</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Our Services
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget
                egestas a elementum pulvinar et feugiat blandit at. In mi viverra elit nunc.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
              <dl className="grid max-w-xl grid-cols-1 gap-y-10 gap-x-8 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
                {services.map((service) => (
                  <div key={service.name} className="relative pl-16">
                    <dt className="text-base font-semibold leading-7 text-gray-900">
                      <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                        <service.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </div>
                      {service.name}
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-gray-600">
                      {service.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <dl className="grid grid-cols-1 gap-y-16 gap-x-8 text-center lg:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                  <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div className="bg-gray-200 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">
                Meet Our Expertise
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Our Awesome Team
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget
                egestas a elementum pulvinar et feugiat blandit at. In mi viverra elit nunc.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
              <ul className="grid grid-cols-1 gap-y-16 gap-x-8 text-center lg:grid-cols-3">
                {people.map((person) => (
                  <li key={person.name}>
                    <div className="flex items-center gap-x-6">
                      <img
                        className="h-16 w-16 rounded-full border border-black"
                        src={person.imageUrl}
                        alt=""
                      />
                      <div>
                        <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                          {person.name}
                        </h3>
                        <p className="text-sm font-semibold leading-6 text-indigo-600">
                          {person.role}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">Reviews</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                What our clients say
              </p>
            </div>
            <div className="mx-auto mt-8 max-w-2xl sm:mt-8 lg:mt-16 lg:max-w-4xl">
              <Carousel
                autoPlay
                infiniteLoop
                showStatus={false}
                showArrows={false}
                showIndicators={false}
                transitionTime={700}>
                {reviews.map((review) => (
                  <div key={review.name} className="relative">
                    <div className="flex mx-auto h-16 w-16 rounded-full border border-black items-center justify-center rounded-lg">
                      <img className="h-16 w-16 rounded-full" src={review.img} alt=""></img>
                    </div>
                    <div className="flex mx-auto mt-2 items-center justify-center text-base font-semibold leading-7 text-gray-900">
                      {review.name}
                    </div>
                    <div className="flex mx-auto mt-2 items-center justify-center text-base font-semibold leading-7 text-blue-500">
                      {review.review}
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
        <div id="contact" className="bg-gray-200 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">Get in touch</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Contact Us
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget
                egestas a elementum pulvinar et feugiat blandit at. In mi viverra elit nunc.
              </p>
            </div>
            <form action="#" method="POST" className="mx-auto mt-8 max-w-xl sm:mt-8">
              <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-semibold leading-6 text-gray-900">
                    First name
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-semibold leading-6 text-gray-900">
                    Last name
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="company"
                    className="block text-sm font-semibold leading-6 text-gray-900">
                    Company
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      name="company"
                      id="company"
                      autoComplete="organization"
                      className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold leading-6 text-gray-900">
                    Email
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="phone-number"
                    className="block text-sm font-semibold leading-6 text-gray-900">
                    Phone number
                  </label>
                  <div className="relative mt-2.5">
                    <div className="absolute inset-y-0 left-0 flex items-center">
                      <label htmlFor="country" className="sr-only">
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
                        <option>US</option>
                        <option>CA</option>
                        <option>EU</option>
                      </select>
                    </div>
                    <input
                      type="tel"
                      name="phone-number"
                      id="phone-number"
                      autoComplete="tel"
                      className="block w-full rounded-md border-0 py-2 px-3.5 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold leading-6 text-gray-900">
                    Message
                  </label>
                  <div className="mt-2.5">
                    <textarea
                      name="message"
                      id="message"
                      rows={4}
                      className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={""}
                    />
                  </div>
                </div>
                <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
                  <div className="flex h-6 items-center">
                    <Switch
                      checked={agreed}
                      onChange={setAgreed}
                      className={classNames(
                        agreed ? "bg-indigo-600" : "bg-gray-400",
                        "flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      )}>
                      <span className="sr-only">Agree to policies</span>
                      <span
                        aria-hidden="true"
                        className={classNames(
                          agreed ? "translate-x-3.5" : "translate-x-0",
                          "h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"
                        )}
                      />
                    </Switch>
                  </div>
                  <Switch.Label className="text-sm leading-6 text-gray-600">
                    By selecting this, you agree to our{" "}
                    <a href="/" className="font-semibold text-indigo-600">
                      privacy&nbsp;policy
                    </a>
                    .
                  </Switch.Label>
                </Switch.Group>
              </div>
              <div className="mt-10">
                <button
                  type="button"
                  className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Let's talk
                </button>
              </div>
            </form>
            <div className="mx-auto mt-8 max-w-2xl sm:mt-8 lg:mt-16 lg:max-w-4xl">
              <dl className="grid max-w-xl grid-cols-1 gap-y-12 gap-x-4 lg:max-w-none lg:grid-cols-3 lg:gap-y-12">
                {contact.map((contact) => (
                  <div key={contact.name} className="relative">
                    <div className="flex mx-auto h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      <contact.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <div className="flex mx-auto mt-2 items-center justify-center text-base font-semibold leading-7 text-gray-900">
                      {contact.name}
                    </div>
                    <div className="flex mx-auto items-center justify-center mt-2 text-base font-semibold leading-7 text-blue-500">
                      {contact.info}
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
        <button
          id="toTop"
          onClick={goToTop}
          className="hidden fixed z-90 bottom-8 right-8 border-0 w-12 h-12 rounded-full drop-shadow-md bg-indigo-500 text-white text-3xl font-bold hover:bg-indigo-700">
          <ArrowUpIcon className="ml-2 h-8 w-8" />
        </button>
      </main>
      <Footer />
    </div>
  );
}

export default App;
