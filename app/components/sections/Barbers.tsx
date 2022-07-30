import { motion, useReducedMotion } from "framer-motion";
import type { Barber } from "~/types";
import { Heading } from "~/components/Heading";
import { BarberCard } from "~/components/BarberCard";

export function Barbers({ barbers }: { barbers: Barber[] }) {
  const reducedMotion = useReducedMotion();
  return (
    <div
      id="barbers"
      className="flex flex-col items-center gap-14 overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0.5, y: 200 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: reducedMotion ? 0 : 0.5,
        }}
        viewport={{ once: true }}
      >
        <Heading>Barbesrs</Heading>
      </motion.div>
      <div className="m-6 flex flex-col flex-wrap justify-center gap-8 md:flex-row">
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
      </div>
    </div>
  );
}
