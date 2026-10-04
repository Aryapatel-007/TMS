import clsx from "clsx";
import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { kitchen, type Dish } from "@/content/site";
import { menuRequestLink } from "@/lib/whatsapp";

// Laid out like a printed menu: four groups, one large photo per group,
// the large photo alternating sides from group to group. No prices.
export function Kitchen() {
  return (
    <Section theme="parchment" id="kitchen" labelledBy="kitchen-title">
      <SectionHeading id="kitchen-title" intro={kitchen.intro}>
        {kitchen.heading}
      </SectionHeading>

      <div className="mt-16 space-y-24 lg:mt-24 lg:space-y-32">
        {kitchen.groups.map((group, g) => {
          const [feature, ...rest] = group.dishes;
          const flip = g % 2 === 1;
          return (
            <section key={group.title} aria-labelledby={`menu-group-${g}`}>
              <h3
                id={`menu-group-${g}`}
                className="text-center font-display text-2xl text-ink-terracotta lg:text-[2.6rem]"
              >
                {group.title}
              </h3>
              <span aria-hidden="true" className="mx-auto mt-4 block h-px w-14 bg-copper" />

              <div className="mt-10 grid items-center gap-12 md:grid-cols-2 lg:mt-14 lg:gap-20">
                <div className={clsx("flex flex-col items-center text-center", flip && "md:order-2")}>
                  <DishPhoto dish={feature} size="large" />
                  <h4 className="mt-6 font-display text-[1.6rem] leading-tight text-ink-terracotta">
                    {feature.name}
                  </h4>
                  <p className="mt-2 max-w-[38ch]">{feature.description}</p>
                </div>

                <ul className="space-y-7 md:space-y-9">
                  {rest.map((dish) => (
                    <li key={dish.name} className="flex items-center gap-5 sm:gap-6">
                      <DishPhoto dish={dish} size="small" />
                      <div>
                        <h4 className="font-display text-[1.375rem] leading-tight text-ink-terracotta">
                          {dish.name}
                        </h4>
                        <p className="mt-1">{dish.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-24 flex flex-col items-center gap-7 text-center lg:mt-32">
        <p className="max-w-[44ch] font-display text-xl italic text-ink-terracotta">{kitchen.closing}</p>
        <TrackedLink
          href={menuRequestLink()}
          target="_blank"
          rel="noopener noreferrer"
          event="menu_request"
          button={{ variant: "secondary" }}
        >
          {kitchen.cta.label}
        </TrackedLink>
      </div>
    </Section>
  );
}

// Bowl shots are circles, everything else is a rectangle with a 2px radius.
function DishPhoto({ dish, size }: { dish: Dish; size: "large" | "small" }) {
  const circle = dish.shape === "circle";
  const large = size === "large";
  return (
    <div
      className={clsx(
        "relative shrink-0 overflow-hidden bg-parchment",
        circle ? "aspect-square rounded-full" : "rounded-[2px]",
        large
          ? circle
            ? "w-full max-w-[min(380px,100%)]"
            : "aspect-[4/3] w-full max-w-[520px]"
          : circle
            ? "size-24 sm:size-28"
            : "h-24 w-32 sm:h-28 sm:w-36",
      )}
      style={large ? { maxWidth: Math.min(dish.image.width, circle ? 380 : 520) } : undefined}
    >
      <Image
        src={dish.image.src}
        alt={dish.image.alt}
        fill
        sizes={large ? "(min-width: 768px) 520px, 90vw" : "144px"}
        // a slight zoom keeps the edge of the bowl photo inside the circle
        className={clsx("object-cover", circle && "scale-[1.07]")}
      />
    </div>
  );
}
