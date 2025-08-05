"use client";

import React from "react";

type FooterProps = {
  copyrightText?: string;
  links?: { label: string; url: string }[];
};

export default function FooterSection({
  copyrightText = "© 2023 My Website. All rights reserved.",
  links = [
    { label: "Privacy Policy", url: "#" },
    { label: "Terms of Service", url: "#" },
    { label: "Contact", url: "#" },
  ],
}: FooterProps) {
  return (
    <footer className="bg-gray-800 text-white py-8 px-6 rounded-lg">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="mb-4 md:mb-0 text-gray-300">{copyrightText}</p>
          <ul className="flex flex-wrap justify-center gap-4">
            {links.map((link, index) => (
              <li key={index}>
                <a
                  href={link.url}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
