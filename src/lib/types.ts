// lib/types.ts
export type NavigationItem = {
  label: string;
  url: string;
};

export type Feature = {
  title: string;
  description: string;
};

export type HeaderProps = {
  siteName?: string;
  navigation?: NavigationItem[];
};

export type HeroProps = {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
};

export type FeaturesProps = {
  title?: string;
  subtitle?: string;
  features?: Feature[];
};

export type FooterProps = {
  copyrightText?: string;
  links?: NavigationItem[];
};

export type SectionType = "header" | "hero" | "features" | "footer";

export type SectionProps =
  | HeaderProps
  | HeroProps
  | FeaturesProps
  | FooterProps;

export type Section = {
  id: string;
  type: SectionType;
  props: SectionProps;
};

export type BuilderState = {
  sections: Section[];
  selectedSection: string | null;
  mobilePanels: {
    library: boolean;
    properties: boolean;
  };
  addSection: (type: SectionType) => void;
  removeSection: (id: string) => void;
  selectSection: (id: string) => void;
  updateSection: (id: string, props: Partial<SectionProps>) => void;
  reorderSections: (fromIndex: number, toIndex: number) => void;
  exportJson: () => string;
  importJson: (json: string) => void;
  toggleMobilePanel: (panel: "library" | "properties") => void;
};
