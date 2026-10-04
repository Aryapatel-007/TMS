import { RestaurantJsonLd } from "@/components/RestaurantJsonLd";
import { Booking } from "@/components/sections/Booking";
import { Celebrations } from "@/components/sections/Celebrations";
import { Chef } from "@/components/sections/Chef";
import { FloatingWhatsApp } from "@/components/sections/FloatingWhatsApp";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Instagram } from "@/components/sections/Instagram";
import { Kitchen } from "@/components/sections/Kitchen";
import { Reviews } from "@/components/sections/Reviews";
import { SpacesGallery } from "@/components/sections/SpacesGallery";
import { Story } from "@/components/sections/Story";
import { Visit } from "@/components/sections/Visit";
import { StarDivider } from "@/components/ui/StarDivider";
import { reviews } from "@/content/site";

// Night sections that meet are separated by the star divider.
function NightDivider() {
  return (
    <div aria-hidden="true" className="bg-night-walnut">
      <StarDivider />
    </div>
  );
}

export default function Home() {
  const hasReviews = reviews.length > 0;
  return (
    <>
      <RestaurantJsonLd />
      <Header />
      <main>
        <Hero />
        <Story />
        <Celebrations />
        <Booking />
        <SpacesGallery />
        <Kitchen />
        <Chef />
        <Reviews />
        {hasReviews ? <NightDivider /> : null}
        <Instagram compactTop={!hasReviews} />
        <NightDivider />
        <Visit />
      </main>
      <NightDivider />
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
