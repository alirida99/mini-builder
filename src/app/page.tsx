import MobileMenu from "src/components/MobileMenu";
import PreviewArea from "src/components/PreviewArea";
import PropertiesPanel from "src/components/PropertiesPanel";
import SectionLibrary from "src/components/SectionLibrary";
import Toolbar from "src/components/Toolbar";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Toolbar />
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        <SectionLibrary />
        <PreviewArea />
        <PropertiesPanel />
      </div>
      <MobileMenu />
    </div>
  );
}
