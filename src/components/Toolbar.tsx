"use client";

import { useBuilderStore } from "../lib/store";

export default function Toolbar() {
  const exportJson = useBuilderStore((state) => state.exportJson);
  const importJson = useBuilderStore((state) => state.importJson);

  const handleExport = () => {
    const jsonString = exportJson();
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "website-design.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        importJson(content);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="bg-gray-800 text-white p-2 md:p-3 flex flex-col md:flex-row justify-between items-center">
      <h1 className="text-base md:text-xl font-bold mb-1 md:mb-0">
        Mini Website Builder
      </h1>
      <div className="flex space-x-1 md:space-x-3">
        <label className="bg-blue-600 hover:bg-blue-700 px-2 py-1 text-xs md:text-base rounded cursor-pointer">
          <span className="hidden md:inline">Import Design</span>
          <span className="md:hidden">Import</span>
          <input
            type="file"
            accept=".json"
            className="hidden"
            onChange={handleImport}
          />
        </label>
        <button
          className="bg-green-600 hover:bg-green-700 px-2 py-1 text-xs md:text-base rounded"
          onClick={handleExport}
        >
          <span className="hidden md:inline">Export Design</span>
          <span className="md:hidden">Export</span>
        </button>
      </div>
    </div>
  );
}
