import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { chef } from "@/content/site";

// The tall frame holds the photo of Chef Arpit at work: his hat portrait only exists
// as a landscape crop, because the original post has lettering across his chest.
// The portrait overlaps the lower corner on desktop.
export function Chef() {
  return (
    <Section theme="navy" id="chef" labelledBy="chef-title">
      <div className="grid items-center gap-14 md:grid-cols-2 lg:gap-24">
        <div className="relative mx-auto w-full max-w-[420px] md:mx-0 md:ml-auto lg:mb-16">
          <div className="relative aspect-[486/623] w-full overflow-hidden rounded-[2px] outline outline-1 outline-offset-[10px] outline-copper/70">
            <Image
              src={chef.atWork.src}
              alt={chef.atWork.alt}
              fill
              sizes="(min-width: 768px) 420px, 90vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-16 -left-24 hidden w-[300px] overflow-hidden rounded-[2px] shadow-[0_24px_60px_-20px_rgb(0_0_0/0.7)] outline outline-1 outline-offset-[6px] outline-copper/70 lg:block">
            <Image
              src={chef.portrait.src}
              alt={chef.portrait.alt}
              width={chef.portrait.width}
              height={chef.portrait.height}
              sizes="300px"
              className="block h-auto w-full"
            />
          </div>
        </div>

        <div className="max-w-md">
          <h2 id="chef-title" className="text-3xl leading-none text-candle-cream lg:text-4xl">
            {chef.name}
          </h2>
          <p className="mt-3 text-smoke">{chef.role}</p>
          <blockquote className="mt-10 border-l border-copper pl-6">
            <p className="font-display text-xl leading-snug text-candle-cream italic lg:text-2xl lg:leading-tight">
              {chef.quote}
            </p>
          </blockquote>
          <p className="mt-8 text-candle-cream/90">{chef.bio}</p>
        </div>
      </div>
    </Section>
  );
}
