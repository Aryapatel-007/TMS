import { VenueJsonLd } from "@/components/VenueJsonLd";
import { Booking } from "@/components/sections/Booking";
import { Celebrations } from "@/components/sections/Celebrations";
import { FloatingWhatsApp } from "@/components/sections/FloatingWhatsApp";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { SpacesGallery } from "@/components/sections/SpacesGallery";
import { Visit } from "@/components/sections/Visit";
import { StarDivider } from "@/components/ui/StarDivider";

// Night sections that meet are separated by the star divider.
function NightDivider() {
  return (
    <div aria-hidden="true" className="bg-night-walnut">
      <StarDivider />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <VenueJsonLd />
      <Header />
      <main>
        <Hero />
        <Celebrations />
        <Booking />
        <SpacesGallery />
        <NightDivider />
        <Visit />
      </main>
      <NightDivider />
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
