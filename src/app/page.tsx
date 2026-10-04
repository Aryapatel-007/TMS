import { Booking } from "@/components/sections/Booking";
import { Celebrations } from "@/components/sections/Celebrations";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { SpacesGallery } from "@/components/sections/SpacesGallery";
import { Story } from "@/components/sections/Story";
import { StarDivider } from "@/components/ui/StarDivider";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Story />
        <Celebrations />
        <Booking />
        <SpacesGallery />
        {/* Filled in by the next phases. The anchors already work for the nav links. */}
        <section id="kitchen" />
        <section id="chef" />
        <section id="visit" />
      </main>
      <div className="bg-night-walnut pt-4">
        <StarDivider />
      </div>
      <Footer />
    </>
  );
}
