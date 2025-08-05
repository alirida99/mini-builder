// lib/store.ts
import { create } from "zustand";
import {
  BuilderState,
  SectionType,
  HeaderProps,
  HeroProps,
  FeaturesProps,
  FooterProps,
  SectionProps,
} from "./types";

// Overloads to specify exact return types for each SectionType
function createDefaultProps(type: "header"): HeaderProps;
function createDefaultProps(type: "hero"): HeroProps;
function createDefaultProps(type: "features"): FeaturesProps;
function createDefaultProps(type: "footer"): FooterProps;
function createDefaultProps(type: SectionType): SectionProps; // <-- catch-all overload

// Implementation
function createDefaultProps(type: SectionType): SectionProps {
  switch (type) {
    case "header":
      return {
        siteName: "My Website",
        navigation: [
          { label: "Home", url: "#" },
          { label: "About", url: "#" },
          { label: "Contact", url: "#" },
        ],
      };
    case "hero":
      return {
        title: "Welcome to our website",
        subtitle: "This is a hero section you can customize",
        buttonText: "Get Started",
        buttonLink: "#",
      };
    case "features":
      return {
        title: "Our Features",
        subtitle: "Discover what makes us special",
        features: [
          { title: "Feature 1", description: "This is a feature description." },
          {
            title: "Feature 2",
            description: "This is another feature description.",
          },
          {
            title: "Feature 3",
            description: "This is a third feature description.",
          },
        ],
      };
    case "footer":
      return {
        copyrightText: "© 2023 My Website. All rights reserved.",
        links: [
          { label: "Privacy Policy", url: "#" },
          { label: "Terms of Service", url: "#" },
          { label: "Contact", url: "#" },
        ],
      };
    default:
      throw new Error(`Unknown section type: ${type}`);
  }
}

export const useBuilderStore = create<BuilderState>((set, get) => ({
  sections: [],
  selectedSection: null,
  mobilePanels: {
    library: false,
    properties: false,
  },
  addSection: (type) =>
    set((state) => {
      const defaultProps = createDefaultProps(type);

      const newId = Date.now().toString();

      return {
        sections: [
          ...state.sections,
          {
            id: newId,
            type,
            props: defaultProps,
          },
        ],
        selectedSection: newId,
      };
    }),
  removeSection: (id) =>
    set((state) => ({
      sections: state.sections.filter((section) => section.id !== id),
      selectedSection:
        state.selectedSection === id ? null : state.selectedSection,
    })),
  selectSection: (id) => set({ selectedSection: id }),
  updateSection: (id, props) =>
    set((state) => ({
      sections: state.sections.map((section) =>
        section.id === id
          ? {
              ...section,
              props: { ...section.props, ...props },
            }
          : section
      ),
    })),
  reorderSections: (fromIndex, toIndex) =>
    set((state) => {
      const newSections = [...state.sections];
      const [movedSection] = newSections.splice(fromIndex, 1);
      newSections.splice(toIndex, 0, movedSection);
      return { sections: newSections };
    }),
  exportJson: () => {
    const state = get();
    const data = {
      version: "1.0",
      sections: state.sections,
    };
    return JSON.stringify(data, null, 2);
  },
  importJson: (json: string) => {
    try {
      const data = JSON.parse(json);
      if (data.sections && Array.isArray(data.sections)) {
        set({ sections: data.sections, selectedSection: null });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Invalid JSON:", error);
      return false;
    }
  },
  toggleMobilePanel: (panel) =>
    set((state) => ({
      mobilePanels: {
        ...state.mobilePanels,
        [panel]: !state.mobilePanels[panel],
      },
    })),
}));
