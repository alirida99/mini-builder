"use client";

import { JSX } from "react";
import { useBuilderStore } from "../lib/store";
import { SectionType } from "../lib/types"; // adjust path as needed

const SECTION_TYPES: {
  type: SectionType;
  name: string;
  icon: JSX.Element;
}[] = [
  {
    type: "header",
    name: "Header",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M4 4h16a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1m0 10h16a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1Z"
        />
      </svg>
    ),
  },
  {
    type: "hero",
    name: "Hero Section",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"
        />
      </svg>
    ),
  },
  {
    type: "features",
    name: "Features",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"
        />
      </svg>
    ),
  },
  {
    type: "footer",
    name: "Footer",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4v-4h16v4zm0-6H4V6h16v6z"
        />
      </svg>
    ),
  },
];

export default function SectionLibrary() {
  const addSection = useBuilderStore((state) => state.addSection);
  const isOpen = useBuilderStore((state) => state.mobilePanels.library);

  return (
    <div
      className={`mobile-panel library-panel ${
        isOpen ? "open" : ""
      } w-full md:w-64 p-4 bg-gray-100 overflow-y-auto text-gray-800`}
    >
      <h2 className="font-bold text-sm md:text-lg mb-3 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="mr-2"
        >
          <path
            fill="currentColor"
            d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z"
          />
        </svg>
        <span className="hidden md:inline">Section Library</span>
        <span className="md:hidden ml-1">Library</span>
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
        {SECTION_TYPES.map((section) => (
          <button
            key={section.type}
            onClick={() => addSection(section.type)}
            className="w-full p-2 md:p-3 bg-white rounded border border-gray-200 hover:border-blue-500 hover:bg-blue-50 flex items-center text-xs md:text-base"
          >
            <span className="text-blue-600 mr-3">{section.icon}</span>
            <span>{section.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
