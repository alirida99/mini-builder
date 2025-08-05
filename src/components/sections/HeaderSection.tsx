"use client";

import React from "react";

type HeaderProps = {
  siteName?: string;
  navigation?: { label: string; url: string }[];
};

export default function HeaderSection({
  siteName = "My Website",
  navigation = [
    { label: "Home", url: "#" },
    { label: "About", url: "#" },
    { label: "Contact", url: "#" },
  ],
}: HeaderProps) {
  return (
    <header className="bg-gray-800 text-white py-4 px-6 rounded-lg">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-xl font-bold mb-3 md:mb-0">{siteName}</h1>
        <nav>
          <ul className="flex flex-wrap justify-center gap-4 md:gap-6">
            {navigation.map((item, index) => (
              <li key={index}>
                <a
                  href={item.url}
                  className="hover:text-gray-300 transition-colors duration-200"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
