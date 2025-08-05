"use client";

import React from "react";

type HeroProps = {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
};

export default function HeroSection({
  title = "Welcome to our website",
  subtitle = "This is a hero section you can customize",
  buttonText = "Get Started",
  buttonLink = "#",
}: HeroProps) {
  return (
    <section className="py-8 md:py-16 px-4 md:px-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg">
      <div className="container mx-auto text-center max-w-3xl">
        <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 animate-fade-in">
          {title}
        </h1>
        <p className="text-base md:text-xl mb-4 md:mb-8 animation-delay-200">
          {subtitle}
        </p>
        <a
          className="inline-block bg-white text-blue-600 rounded-lg text-sm md:text-base px-4 md:px-8 py-2 md:py-3 hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 
                     shadow-lg animate-fade-in animation-delay-400"
        >
          {buttonText}
        </a>
      </div>
    </section>
  );
}
