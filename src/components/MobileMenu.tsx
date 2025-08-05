"use client";

import { useBuilderStore } from "src/lib/store";

export default function MobileMenu() {
  const togglePanel = useBuilderStore((state) => state.toggleMobilePanel);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-2 flex justify-between z-50">
      <button onClick={() => togglePanel("library")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          className="mr-1"
        >
          <path
            fill="currentColor"
            d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"
          />
        </svg>
        Library
      </button>

      <button onClick={() => togglePanel("properties")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          className="mr-1"
        >
          <path
            fill="currentColor"
            d="M19.14 7.5A2.86 2.86 0 0 0 16.36 4c-1.4 0-2.52.78-2.86 1.88c-.34-1.1-1.46-1.88-2.86-1.88c-1.57 0-2.86 1.29-2.86 2.86c0 .92.44 1.73 1.14 2.24L12 13.37l4.14-3.63c.7-.51 1.14-1.32 1.14-2.24c0-.05 0-.1-.01-.15c.01.05.01.1.01.15c0-.05 0-.1-.01-.15c.01.05.01.1.01.15c0-.05 0-.1-.01-.15c.01.05.01.1.01.15z"
          />
        </svg>
        Properties
      </button>
    </div>
  );
}
