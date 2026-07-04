import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Domains from "@/components/Domains";
import Labs from "@/components/Labs";
import ProjectsSection from "@/components/ProjectsSection";
import DtcExplorer from "@/components/DtcExplorer";
import PalestineMap from "@/components/PalestineMap";
import JoinForm from "@/components/JoinForm";
import HydrogenHub from "@/components/HydrogenHub";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main id="top" className="relative">
      <Nav />
      <Hero />
      <Stats />
      <Domains />
      <Labs />
        <ProjectsSection />
        <HydrogenHub />
        <DtcExplorer />
      <PalestineMap />
        <JoinForm />
        <Footer />
    </main>
  );
}
