import { motion, useReducedMotion } from "framer-motion";
import { Heading } from "~/components/Heading";

export function About() {
  const reducedMotion = useReducedMotion();
  return (
    <section
      id="about"
      className="relative -mt-[100vh] flex h-screen items-center gap-12 overflow-hidden bg-white py-8 text-black"
    >
      <figure className="h-5/6">
        <picture>
          <source srcSet="images/about.webp" type="image/webp" />
          <source srcSet="images/about.jpg" type="image/jpeg" />
          <motion.img
            initial={{ opacity: 0.5, x: -200 }}
            whileInView={{ opacity: 1, x: -32 }}
            transition={{
              duration: reducedMotion ? 0 : 0.5,
            }}
            viewport={{ once: true, margin: "-15%" }}
            src="images/about.jpg"
            alt=""
            className="hidden h-full border-4 border-brand object-cover drop-shadow-lg lg:block"
          />
        </picture>
      </figure>
      <motion.div
        initial={{ opacity: 0.5, x: 200 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{
          duration: reducedMotion ? 0 : 0.5,
        }}
        viewport={{ once: true, margin: "-30%" }}
        className="flex h-5/6 flex-col justify-center gap-9 p-4"
      >
        <Heading>About Us</Heading>
        <p tabIndex={0} className="max-w-prose px-12 drop-shadow-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. A dignissim
          tellus at ac tellus cursus. Magna gravida mi consequat quam turpis
          donec nam. Vivamus vulputate egestas cursus purus elementum auctor
          nunc sed cursus. Quis vulputate enim quis ac. Eleifend enim eget mi
          volutpat in volutpat dictum risus. Ultrices tellus nisl, lectus
          gravida vestibulum maecenas orci, id. Habitant ultricies tincidunt
          habitant vestibulum mi nisi, porttitor. Pretium vulputate egestas
          neque nibh neque leo, scelerisque phasellus condimentum. Volutpat sit
          aliquet ac nunc eget. Aliquet mi sollicitudin id phasellus fermentum
          justo tellus neque. Sem nisi amet sit nibh neque mollis.
        </p>
      </motion.div>
    </section>
  );
}
