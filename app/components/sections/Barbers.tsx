import { motion, useReducedMotion } from "framer-motion";
import type { Barber } from "~/types";
import { Heading } from "~/components/Heading";
import { BarberCard } from "~/components/BarberCard";

export function Barbers({ barbers }: { barbers: Barber[] }) {
  const reducedMotion = useReducedMotion();
  return (
    <div className="h-[200vh]">
      <section
        id="barbers"
        className="sticky top-0 flex h-screen flex-col items-center justify-center gap-14 p-8"
      >
        <motion.div
          initial={{ opacity: 0.5, y: 200 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: reducedMotion ? 0 : 0.5,
          }}
          viewport={{ once: true }}
        >
          <Heading>Barbers</Heading>
        </motion.div>
        <ul className="flex max-w-full snap-x gap-4 overflow-x-auto overscroll-contain scroll-smooth py-2">
          {barbers.map((barber) => (
            <BarberCard
              key={barber.instagram}
              image={barber.avatar.url}
              name={barber.name}
              instagram={barber.instagram}
              instagramLink={barber.instagramUrl}
              bio={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lorem ullamcorper feugiat facilisis augue integer eget. Quam consectetur netus gravida mi."
              }
            />
          ))}
        </ul>
      </section>
    </div>
  );
}
