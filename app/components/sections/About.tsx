import { motion } from "framer-motion";
import { Heading } from "~/components/Heading";
import { useReducedMotion } from "~/utils";

export function About() {
  const { duration } = useReducedMotion();
  return (
    <section
      id="about"
      className="isolate flex items-center gap-12 overflow-hidden py-8 lg:h-screen"
    >
      <figure className="z-10 hidden h-5/6 lg:block">
        <picture>
          <source srcSet="images/about.webp" type="image/webp" />
          <source srcSet="images/about.jpg" type="image/jpeg" />
          <motion.img
            initial={{ x: -200 }}
            whileInView={{ x: -32 }}
            transition={{
              duration,
            }}
            viewport={{ once: true, margin: "-10%" }}
            src="images/about.jpg"
            alt=""
            className="hidden h-full border-4 border-brand object-cover drop-shadow-lg lg:block"
          />
        </picture>
      </figure>
      <motion.div
        initial={{ opacity: 0.5, translateX: "-50vw" }}
        whileInView={{ opacity: 1, translateX: 0 }}
        transition={{
          duration,
        }}
        viewport={{ once: true, margin: "-10%" }}
        className="flex h-5/6 flex-col justify-center gap-9 p-4"
      >
        <Heading>About Us</Heading>
        <p className="max-w-prose px-8 drop-shadow">
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
