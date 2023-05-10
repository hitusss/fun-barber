import { motion } from "framer-motion";
import type { Barber } from "~/types";
import { Heading } from "~/components/Heading";
import { BarberCard } from "~/components/BarberCard";
import { useReducedMotion } from "~/utils";

export function Barbers({ barbers }: { barbers: Barber[] }) {
  const { duration } = useReducedMotion();
  return (
    <section
      id="barbers"
      className="flex flex-col items-center justify-center gap-14 px-8 py-16"
    >
      <motion.div
        initial={{ opacity: 0.5, y: 200 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration,
        }}
        viewport={{ once: true }}
      >
        <Heading>Barbers</Heading>
      </motion.div>
      <ul className="flex max-w-full snap-x gap-4 overflow-x-auto overflow-y-hidden scroll-smooth py-2">
        {barbers.map((barber, i) => (
          <BarberCard
            key={barber.instagram}
            image={barber.avatar.url}
            name={barber.name}
            instagram={barber.instagram}
            instagramLink={barber.instagramUrl}
            bio={barber.bio}
            delay={0.05 * i}
          />
        ))}
      </ul>
    </section>
  );
}
