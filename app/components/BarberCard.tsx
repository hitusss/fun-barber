import { motion, useReducedMotion } from "framer-motion";
import { InstagramIcon } from "~/components/Icons";

type BarberCardProp = {
  image: string;
  name: string;
  instagram: string;
  instagramLink: string;
  bio: string;
};

export function BarberCard({
  image,
  name,
  instagram,
  instagramLink,
  bio,
}: BarberCardProp) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.li
      initial={{ opacity: 0.5, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: reducedMotion ? 0 : 0.5,
      }}
      viewport={{ once: true }}
      tabIndex={0}
      style={{
        backgroundImage: `url(${image}?w=400&h=400)`,
      }}
      className="group flex h-96 w-72 shrink-0 grow-0 select-none snap-center items-end overflow-hidden rounded-2xl bg-cover bg-center drop-shadow-lg"
    >
      <div className="flex w-full flex-col items-center justify-center gap-3 bg-black/70 py-2 group-focus-within:h-full group-hover:h-full">
        <h2 className="text-center text-2xl font-bold">{name}</h2>
        <a
          href={instagramLink}
          aria-label={`${instagram} on Instagram`}
          className="flex items-center gap-3 fill-white text-lg"
        >
          <InstagramIcon width={24} height={24} /> {instagram}
        </a>
        <p className="hidden px-8 text-center text-sm group-focus-within:block group-hover:block">
          {bio}
        </p>
      </div>
    </motion.li>
  );
}
