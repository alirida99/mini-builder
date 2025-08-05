"use client";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { useBuilderStore } from "../lib/store";
import { Section } from "../lib/types";
import { SortableSection } from "./SortableSection";

// Import section components
import HeaderSection from "./sections/HeaderSection";
import HeroSection from "./sections/HeroSection";
import FeaturesSection from "./sections/FeaturesSection";
import FooterSection from "./sections/FooterSection";
import { Feature, NavigationItem } from "src/lib/types";

type SectionComponentProps = {
  siteName?: string;
  navigation?: NavigationItem[];
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  features?: Feature[];
  copyrightText?: string;
  links?: NavigationItem[];
};

const SECTION_COMPONENTS: Record<
  string,
  React.ComponentType<SectionComponentProps>
> = {
  header: HeaderSection,
  hero: HeroSection,
  features: FeaturesSection,
  footer: FooterSection,
};

export default function PreviewArea() {
  const { sections, selectSection, selectedSection, reorderSections } =
    useBuilderStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = sections.findIndex(
        (section) => section.id === active.id
      );
      const newIndex = sections.findIndex((section) => section.id === over.id);
      reorderSections(oldIndex, newIndex);
    }
  };

  const renderSection = (section: Section) => {
    const Component = SECTION_COMPONENTS[section.type];
    if (!Component) return null;

    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
          selectSection(section.id);
        }}
        className={`mb-4 border-2 rounded-lg transition-all relative ${
          selectedSection === section.id
            ? "border-blue-500 shadow-lg"
            : "border-transparent hover:border-gray-300"
        }`}
      >
        <div className="absolute top-1 right-1 md:top-2 md:right-2 flex space-x-1">
          <div className="bg-white rounded-full p-1 shadow-md cursor-grab">
            <svg width="12" height="12" className="md:w-4 md:h-4">
              <path
                fill="currentColor"
                d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2s.9-2 2-2s2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2s-2 .9-2 2s.9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2z"
              />
            </svg>
          </div>
          <button
            className="bg-red-500 text-white rounded-full p-1 shadow-md"
            onClick={(e) => {
              e.stopPropagation();
              useBuilderStore.getState().removeSection(section.id);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z"
              />
            </svg>
          </button>
        </div>
        <Component {...section.props} />
      </div>
    );
  };

  if (sections.length === 0) {
    return (
      <div className="flex-1 p-4 overflow-auto flex items-center justify-center bg-gray-50">
        <div className="text-center text-gray-500 max-w-md">
          <div className="mx-auto bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mb-4 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="text-gray-500"
            >
              <path
                fill="currentColor"
                d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-medium mb-2">No sections yet</h3>
          <p>Click on a section from the library to add to your page</p>
        </div>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <div className="flex-1 p-2 md:p-4 bg-gradient-to-br from-gray-50 to-gray-100 overflow-auto">
        <div className="max-w-4xl mx-auto bg-white rounded-lg md:rounded-xl shadow-sm p-3 md:p-6">
          <SortableContext
            items={sections.map((s) => s.id)}
            strategy={verticalListSortingStrategy}
          >
            {sections.map((section) => (
              <SortableSection key={section.id} id={section.id}>
                {renderSection(section)}
              </SortableSection>
            ))}
          </SortableContext>
        </div>
      </div>
    </DndContext>
  );
}
