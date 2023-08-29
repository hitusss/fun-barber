import { Link } from "@remix-run/react";
import { motion } from "framer-motion";
import type { Service } from "~/types.ts";
import { Heading } from "~/components/Heading.tsx";
import { Button } from "~/components/Button.tsx";
import { ServiceCard } from "~/components/ServiceCard.tsx";
import { useReducedMotion } from "~/utils/index.ts";

export function Services({ services }: { services: Service[] }) {
  const { duration } = useReducedMotion();
  return (
    <section
      id="services"
      className="flex items-center justify-center gap-12 overflow-hidden py-12 lg:justify-end"
    >
      <div className="flex h-5/6 max-w-6xl flex-col items-center justify-start gap-9 p-6">
        <Heading>Services</Heading>
        <div className="flex flex-col flex-wrap justify-center gap-4 md:flex-row">
          {services.map((service, i) => (
            <ServiceCard
              key={service.name}
              title={service.name}
              price={service.price}
              description={service.description}
              icon={service.icon}
              delay={0.1 * i}
            />
          ))}
        </div>
        <Button size="large" color="light">
          <Link to="booking">Book Now</Link>
        </Button>
      </div>
      <figure className="hidden h-5/6 max-h-screen w-1/3 xl:block">
        <picture>
          <source srcSet="images/services.webp" type="image/webp" />
          <source srcSet="images/services.jpg" type="image/jpeg" />
          <motion.img
            initial={{ opacity: 0.5, x: 200, scale: 0.5 }}
            whileInView={{ opacity: 1, x: 32, scale: 1 }}
            transition={{
              duration,
            }}
            viewport={{ once: true, margin: "-5%" }}
            src="images/services.jpg"
            alt=""
            className="hidden h-full border-4 border-brand object-cover drop-shadow-lg xl:block"
          />
        </picture>
      </figure>
    </section>
  );
}
