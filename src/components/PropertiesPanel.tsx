"use client";

import {
  Feature,
  FeaturesProps,
  FooterProps,
  HeaderProps,
  HeroProps,
  NavigationItem,
} from "src/lib/types";
import { useBuilderStore } from "../lib/store";

export default function PropertiesPanel() {
  const { selectedSection, sections, updateSection, removeSection } =
    useBuilderStore();
  const isOpen = useBuilderStore((state) => state.mobilePanels.library);

  const section = sections.find((s) => s.id === selectedSection);
  if (!section) {
    return (
      <div
        className={`mobile-panel properties-panel ${
          isOpen ? "open" : ""
        } w-full md:w-64 p-4 bg-gray-100 overflow-y-auto`}
      >
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            className="mb-3"
          >
            <path
              fill="currentColor"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
            />
          </svg>
          <p className="text-center text-gray-800">
            Select a section to edit its properties
          </p>
        </div>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    updateSection(section.id, {
      ...section.props,
      [e.target.name]: e.target.value,
    });
  };

  type ArrayField = "navigation" | "links" | "features";
  type ArrayItem = NavigationItem | Feature;

  const handleArrayChange = (
    field: ArrayField,
    index: number,
    value: ArrayItem
  ) => {
    if (!section) return;

    if (field === "navigation" && section.type === "header") {
      const props = section.props as HeaderProps;
      const newArray = [...(props.navigation || [])];
      newArray[index] = value as NavigationItem;
      updateSection(section.id, {
        ...props,
        navigation: newArray,
      });
    } else if (field === "links" && section.type === "footer") {
      const props = section.props as FooterProps;
      const newArray = [...(props.links || [])];
      newArray[index] = value as NavigationItem;
      updateSection(section.id, {
        ...props,
        links: newArray,
      });
    } else if (field === "features" && section.type === "features") {
      const props = section.props as FeaturesProps;
      const newArray = [...(props.features || [])];
      newArray[index] = value as Feature;
      updateSection(section.id, {
        ...props,
        features: newArray,
      });
    } else {
      // Invalid case, do nothing or throw error
    }
  };

  return (
    <div className="w-full md:w-64 p-2 md:p-4 bg-gray-100 overflow-y-auto border-t md:border-l border-gray-200 text-gray-800">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg capitalize">
          {section.type} Properties
        </h2>
        <button
          onClick={() => removeSection(section.id)}
          className="text-red-500 hover:text-red-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
            />
          </svg>
        </button>
      </div>

      {section.type === "header" &&
        (() => {
          const props = section.props as HeaderProps;

          return (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Site Name
                </label>
                <input
                  type="text"
                  name="siteName"
                  value={props.siteName || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Navigation Links
                </label>
                {(props.navigation || []).map(
                  (link: NavigationItem, index: number) => (
                    <div key={index} className="flex mb-2">
                      <input
                        type="text"
                        value={link.label || ""}
                        onChange={(e) =>
                          handleArrayChange("navigation", index, {
                            ...link,
                            label: e.target.value,
                          })
                        }
                        placeholder="Label"
                        className="flex-1 p-2 border rounded mr-1"
                      />
                      <input
                        type="text"
                        value={link.url || ""}
                        onChange={(e) =>
                          handleArrayChange("navigation", index, {
                            ...link,
                            url: e.target.value,
                          })
                        }
                        placeholder="URL"
                        className="flex-1 p-2 border rounded"
                      />
                    </div>
                  )
                )}

                <button
                  onClick={() => {
                    const navigation = [
                      ...(props.navigation || []),
                      { label: "New Link", url: "#" },
                    ];
                    updateSection(section.id, {
                      ...props,
                      navigation,
                    });
                  }}
                  className="w-full mt-2 bg-gray-200 hover:bg-gray-300 p-2 rounded"
                >
                  + Add Link
                </button>
              </div>
            </div>
          );
        })()}

      {section.type === "hero" &&
        (() => {
          const props = section.props as HeroProps;

          return (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={props.title || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Subtitle
                </label>
                <textarea
                  name="subtitle"
                  value={props.subtitle || ""}
                  onChange={handleChange}
                  rows={3}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Button Text
                </label>
                <input
                  type="text"
                  name="buttonText"
                  value={props.buttonText || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Button Link
                </label>
                <input
                  type="text"
                  name="buttonLink"
                  value={props.buttonLink || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          );
        })()}

      {section.type === "features" &&
        (() => {
          const props = section.props as FeaturesProps;

          const handleRemoveFeature = (index: number) => {
            const features = [...(props.features || [])];
            features.splice(index, 1);
            updateSection(section.id, {
              ...props,
              features,
            });
          };

          const handleFeatureChange = (
            index: number,
            field: string,
            value: string
          ) => {
            const features = [...(props.features || [])];
            features[index] = {
              ...features[index],
              [field]: value,
            };
            updateSection(section.id, {
              ...props,
              features,
            });
          };

          const handleAddFeature = () => {
            const features = [
              ...(props.features || []),
              { title: "New Feature", description: "Feature description" },
            ];
            updateSection(section.id, {
              ...props,
              features,
            });
          };

          return (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={props.title || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Subtitle
                </label>
                <textarea
                  name="subtitle"
                  value={props.subtitle || ""}
                  onChange={handleChange}
                  rows={2}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Features
                </label>
                <div className="space-y-3">
                  {(props.features || []).map((feature, index) => (
                    <div key={index} className="border p-2 rounded bg-white">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">
                          Feature #{index + 1}
                        </span>
                        <button
                          onClick={() => handleRemoveFeature(index)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                      <input
                        type="text"
                        value={feature.title || ""}
                        onChange={(e) =>
                          handleFeatureChange(index, "title", e.target.value)
                        }
                        placeholder="Title"
                        className="w-full p-1 border rounded mb-1"
                      />
                      <textarea
                        value={feature.description || ""}
                        onChange={(e) =>
                          handleFeatureChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        placeholder="Description"
                        rows={2}
                        className="w-full p-1 border rounded"
                      />
                    </div>
                  ))}
                  <button
                    onClick={handleAddFeature}
                    className="w-full mt-2 bg-gray-200 hover:bg-gray-300 p-2 rounded flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      className="mr-1"
                    >
                      <path
                        fill="currentColor"
                        d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
                      />
                    </svg>
                    Add Feature
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

      {section.type === "footer" &&
        (() => {
          const props = section.props as FooterProps;

          return (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Copyright Text
                </label>
                <input
                  type="text"
                  name="copyrightText"
                  value={props.copyrightText || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Links</label>
                {(props.links || []).map(
                  (link: NavigationItem, index: number) => (
                    <div key={index} className="flex mb-2">
                      <input
                        type="text"
                        value={link.label || ""}
                        onChange={(e) =>
                          handleArrayChange("links", index, {
                            ...link,
                            label: e.target.value,
                          })
                        }
                        placeholder="Label"
                        className="flex-1 p-2 border rounded mr-1"
                      />
                      <input
                        type="text"
                        value={link.url || ""}
                        onChange={(e) =>
                          handleArrayChange("links", index, {
                            ...link,
                            url: e.target.value,
                          })
                        }
                        placeholder="URL"
                        className="flex-1 p-2 border rounded"
                      />
                    </div>
                  )
                )}
                <button
                  onClick={() => {
                    const links = [
                      ...(props.links || []),
                      { label: "New Link", url: "#" },
                    ];
                    updateSection(section.id, {
                      ...props,
                      links,
                    });
                  }}
                  className="w-full mt-2 bg-gray-200 hover:bg-gray-300 p-2 rounded"
                >
                  + Add Link
                </button>
              </div>
            </div>
          );
        })()}
    </div>
  );
}
