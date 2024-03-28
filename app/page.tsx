"use client";
import { keyFeatures } from "@/data/keyFeatures";
import { whySubscribe } from "@/data/newsLetter";
import { whyChooseSecureGuard } from "@/data/whyChooseSecureGuard";
import Link from "next/link";
import React, { Fragment } from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";
function Home() {
  return (
    <Fragment>
      <main className="home">
        <section className="px-2 md:px-4 py-1 container flex flex-col justify-start items-start text-light z-10 relative">
          <div className="w-full md:w-[700px] mt-5 ">
            <h1 className="text-3xl text-center md:text-left md:text-5xl font-bold md:leading-[4rem]">
              Welcome to{" "}
              <span className="text-darkRed">Uniben SecureGuard: {"  "}</span>
              Your Trusted Security Partner
            </h1>
            <p className="text-center md:text-left md:leading-8 mt-5 md:text-xl">
              At Uniben SecureGuard, we understand the importance of a secure
              and resilient environment within Uniben. Our cutting-edge Security
              and Information Report System provide you with the tools and
              insights needed to safeguard your assets and data.
            </p>
          </div>
          <button className="btn btn-lg btn-primary mt-10">
            <Link href={"/category"}>Report Now</Link>
          </button>
        </section>
      </main>
      <section className="bg-gray-100 z-10">
        <AnimationOnScroll
          animateIn="animate__bounceIn"
          className="container mx-auto relative md:-mt-20 z-10 bg-gray-300 px-3 py-2 drop-shadow-md shadow-md rounded-md grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 justify-between items-center gap-4"
        >
          {keyFeatures.map((item) => (
            <div
              className="w-full h-32 bg-light shadow-xl flex flex-col justify-center items-center gap-2"
              key={item.id}
            >
              <div className="px-4 pt-5 text-4xl">{item.icon}</div>
              <div className=" items-center text-center">
                <h2 className="text-md font-semibold">{item.title}</h2>
                {/* <p>{item.description}</p> */}
              </div>
            </div>
          ))}
        </AnimationOnScroll>
      </section>

      <AnimationOnScroll
        offset={3}
        animateIn="animate__bounceIn"
        className="my-10 container mx-auto"
      >
        <h1 className="font-bold text-center text-3xl mb-7 text-darkRed">
          Why Choose Us
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-4">
          {whyChooseSecureGuard.map((item) => (
            <div
              className="shadow-inner bg-white my-3 p-3 flex justify-center items-center flex-col"
              key={item.id}
            >
              <div className="flex flex-col justify-center items-center">
                <h3 className="text-3xl">{item.icon}</h3>
                <h4 className="text-xl font-semibold">{item.point}</h4>
              </div>
              <div className="my-4">
                <p className="text=xl text-center">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </AnimationOnScroll>

      <AnimationOnScroll
        animateIn="animate__shakeY"
        animateOut="animate__bounceOutRight"
        className="container mx-auto flex  flex-col-reverse md:flex-row justify-between gap-10 items-center mt-16 bg-gray-900"
      >
        <div className="shadow py-3  px-2 bg-gray-50 w-full">
          {whySubscribe.map((item) => (
            <div className="shadow-inner bg-white my-3 p-3" key={item.id}>
              <h4 className="text-xl font-semibold">{item.point}</h4>
              <div className="flex flex-row justify-start items-center my-4">
                <h3 className="text-3xl">{item.icon}</h3>
                <p className="text=xl">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        <form className="w-full text-white px-4">
          <h1 className="text-3xl text-center md:text-left font-bold text-darkRed">
            Subscribe to our News Letter
          </h1>
          <p className="text-xl my-5 text-center md:text-left">
            Stay informed and never miss an update! Subscribe to our newsletter
            to receive the latest news, security tips, and exclusive insights.
            Be the first to know about new features, events, and special offers.
          </p>
          <div className="input input-bordered flex items-center gap-2 text-gray-900 text-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input type="text" className="grow" placeholder="Email" />
          </div>
          <button className="btn btn-primary mt-5 block w-full">
            Subscribe
          </button>
        </form>
      </AnimationOnScroll>
    </Fragment>
  );
}

export default Home;
