import { Link } from "@remix-run/react";
import { motion, useReducedMotion } from "framer-motion";
import HeroImg from "~/image/hero.jpg";
import { Button } from "~/components/Button";

export function Hero() {
  const reducedMotion = useReducedMotion();
  return (
    <div className="h-[200vh]">
      <section className="sticky top-0 flex h-screen items-center overflow-hidden py-8">
        <motion.div
          initial={{ opacity: 0.5, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            duration: reducedMotion ? 0 : 0.5,
          }}
          viewport={{ once: true }}
          className="absolute left-[10%] z-10 xl:left-1/4"
        >
          <h1 className="mb-8 text-heading">
            Let Us Make <br />
            The Best Version <br />
            Of Yourself
          </h1>
          <Button size="large">
            <Link to="booking">Book Now</Link>
          </Button>
        </motion.div>
        <motion.img
          initial={{ opacity: 0.5, x: 200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            duration: reducedMotion ? 0 : 0.5,
          }}
          viewport={{ once: true }}
          src={HeroImg}
          alt=""
          className="absolute -right-1/4 aspect-[8/9] h-4/5 border-4 border-brand object-cover drop-shadow-lg lg:right-[15%]"
        />
      </section>
    </div>
  );
}
