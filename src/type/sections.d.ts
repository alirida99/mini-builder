// types/sections.d.ts
import { FC } from "react";
import {
  HeaderProps,
  HeroProps,
  FeaturesProps,
  FooterProps,
} from "../lib/types";

declare module "@/components/sections/HeaderSection" {
  const HeaderSection: FC<HeaderProps>;
  export default HeaderSection;
}

declare module "@/components/sections/HeroSection" {
  const HeroSection: FC<HeroProps>;
  export default HeroSection;
}

declare module "@/components/sections/FeaturesSection" {
  const FeaturesSection: FC<FeaturesProps>;
  export default FeaturesSection;
}

declare module "@/components/sections/FooterSection" {
  const FooterSection: FC<FooterProps>;
  export default FooterSection;
}
