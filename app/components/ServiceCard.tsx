import { motion } from 'framer-motion'

import * as Icons from '~/components/Icons.tsx'
import { useReducedMotion } from '~/utils/index.ts'

type ServiceCardProps = {
	title: string
	price: number
	description: string
	icon: string
	delay: number | undefined
}

export function ServiceCard({
	title,
	price,
	description,
	icon,
	delay,
}: ServiceCardProps) {
	const { duration } = useReducedMotion()
	// @ts-ignore
	const Icon = Icons[icon] ?? Icons.ScissorsIcon
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.75, y: 150 }}
			whileInView={{ opacity: 1, scale: 1, y: 0 }}
			transition={{
				duration,
				delay,
			}}
			viewport={{ once: true, margin: '10%' }}
			className="flex h-80 w-72 flex-col items-center gap-4 rounded-lg bg-white/20 py-6 shadow-xl"
		>
			<Icon className="fill-brand stroke-brand" />
			<div className="flex flex-col items-center font-bold text-brand">
				<h2 className="text-2xl">{title}</h2>
				<h3 className="text-xl">{price}$</h3>
			</div>
			<p className="px-4 text-center text-sm">{description}</p>
		</motion.div>
	)
}
