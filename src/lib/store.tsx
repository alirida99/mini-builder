import { create } from "zustand";

export type Section = {
  id: string;
  type: string;
  props: Record<string, any>;
};

export type BuilderState = {
  sections: Section[];
  selectedSection: string | null;
  addSection: (type: string) => void;
  removeSection: (id: string) => void;
  selectSection: (id: string) => void;
  updateSection: (id: string, props: Record<string, any>) => void;
  reorderSections: (fromIndex: number, toIndex: number) => void;
  exportJson: () => string;
  importJson: (json: string) => void;
  mobilePanels: {
    library: boolean;
    properties: boolean;
  };
  toggleMobilePanel: (panel: "library" | "properties") => void;
};

export const useBuilderStore = create<BuilderState>((set, get) => ({
  sections: [],
  selectedSection: null,
  addSection: (type) =>
    set((state) => {
      const defaultProps: Record<string, any> = {};

      // Set default props based on section type
      if (type === "header") {
        defaultProps.siteName = "My Website";
        defaultProps.navigation = [
          { label: "Home", url: "#" },
          { label: "About", url: "#" },
          { label: "Contact", url: "#" },
        ];
      } else if (type === "hero") {
        defaultProps.title = "Welcome to our website";
        defaultProps.subtitle = "This is a hero section you can customize";
        defaultProps.buttonText = "Get Started";
        defaultProps.buttonLink = "#";
      } else if (type === "features") {
        defaultProps.title = "Our Features";
        defaultProps.subtitle = "Discover what makes us special";
        defaultProps.features = [
          { title: "Feature 1", description: "This is a feature description." },
          {
            title: "Feature 2",
            description: "This is another feature description.",
          },
          {
            title: "Feature 3",
            description: "This is a third feature description.",
          },
        ];
      } else if (type === "footer") {
        defaultProps.copyrightText = "© 2023 My Website. All rights reserved.";
        defaultProps.links = [
          { label: "Privacy Policy", url: "#" },
          { label: "Terms of Service", url: "#" },
          { label: "Contact", url: "#" },
        ];
      }

      return {
        sections: [
          ...state.sections,
          {
            id: Date.now().toString(),
            type,
            props: defaultProps,
          },
        ],
        selectedSection: Date.now().toString(),
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
        section.id === id ? { ...section, props } : section
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
  mobilePanels: {
    library: false,
    properties: false,
  },
  toggleMobilePanel: (panel) =>
    set((state) => ({
      mobilePanels: {
        ...state.mobilePanels,
        [panel]: !state.mobilePanels[panel],
      },
    })),
}));
