import { Link } from "@remix-run/react";
import { motion, useReducedMotion } from "framer-motion";
import type { Service } from "~/types";
import { Heading } from "~/components/Heading";
import { Button } from "~/components/Button";
import { ServiceCard } from "~/components/ServiceCard";

export function Services({ services }: { services: Service[] }) {
  const reducedMotion = useReducedMotion();
  return (
    <section
      id="services"
      className="relative -mt-[100vh] flex min-h-screen items-center justify-center gap-12 overflow-hidden bg-white py-8 lg:justify-end"
    >
      <motion.div
        initial={{ opacity: 0.5, x: -200 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{
          duration: reducedMotion ? 0 : 0.5,
        }}
        viewport={{ once: true, margin: "-30%" }}
        className="flex h-5/6 max-w-6xl flex-col items-center justify-start gap-9 p-4"
      >
        <Heading>Services</Heading>
        <div className="flex flex-col flex-wrap justify-center gap-4 md:flex-row">
          {services.map((service) => (
            <ServiceCard
              key={service.name}
              title={service.name}
              price={service.price}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
        <Button size="large" color="dark">
          <Link to="booking">Book Now</Link>
        </Button>
      </motion.div>
      <figure className="h-5/6 max-h-screen w-1/3">
        <picture>
          <source srcSet="images/services.webp" type="image/webp" />
          <source srcSet="images/services.jpg" type="image/jpeg" />
          <motion.img
            initial={{ opacity: 0.5, x: 200 }}
            whileInView={{ opacity: 1, x: 32 }}
            transition={{
              duration: reducedMotion ? 0 : 0.5,
            }}
            viewport={{ once: true, margin: "-15%" }}
            src="images/services.jpg"
            alt=""
            className="hidden h-full border-4 border-brand object-cover drop-shadow-lg xl:block"
          />
        </picture>
      </figure>
    </section>
  );
}
