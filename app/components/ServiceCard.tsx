import { motion, useReducedMotion } from "framer-motion";
import * as Icons from "~/components/Icons";

type ServiceCardProps = {
  title: string;
  price: number;
  description: string;
  icon: string;
};

export function ServiceCard({
  title,
  price,
  description,
  icon,
}: ServiceCardProps) {
  const reducedMotion = useReducedMotion();
  // @ts-ignore
  const Icon = Icons[icon] ?? Icons.ScissorsIcon;
  return (
    <motion.div
      initial={{ opacity: 0.5, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: reducedMotion ? 0 : 0.5,
      }}
      viewport={{ once: true }}
      className="flex h-80 w-72 flex-col items-center gap-4 rounded-lg bg-gray-d py-6 shadow-md"
    >
      <Icon className="fill-brand stroke-brand" />
      <div className="flex flex-col items-center font-bold text-brand">
        <h2 className="text-2xl">{title}</h2>
        <h3 className="text-xl">{price}$</h3>
      </div>
      <p className="px-4 text-center text-sm">{description}</p>
    </motion.div>
  );
}
