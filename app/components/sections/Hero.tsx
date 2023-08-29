import { Link } from '@remix-run/react'
import { motion } from 'framer-motion'

import { Button } from '~/components/Button.tsx'
import { useReducedMotion } from '~/utils/index.ts'

export function Hero() {
	const { duration } = useReducedMotion()
	return (
		<section className="flex h-screen items-center overflow-hidden py-8">
			<motion.div
				initial={{ opacity: 0.5, x: -200 }}
				whileInView={{ opacity: 1, x: 0 }}
				transition={{
					duration,
				}}
				viewport={{ once: true }}
				className="absolute left-[10%] z-10 xl:left-1/4"
			>
				<h1 className="mb-8 text-heading">
					Let Us Make <br />
					The Best Version <br />
					Of Yourself
				</h1>
				<Link to="booking">
					<Button size="large">Book Now</Button>
				</Link>
			</motion.div>
			<figure className="h-4/5">
				<picture>
					<source srcSet="images/hero.webp" type="image/webp" />
					<source srcSet="images/hero.jpg" type="image/jpeg" />
					<motion.img
						initial={{ opacity: 0.5, x: 200 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{
							duration,
						}}
						viewport={{ once: true }}
						src="images/hero.jpg"
						alt=""
						className="absolute -right-1/4 aspect-[8/9] h-4/5 border-4 border-brand object-cover drop-shadow-lg lg:right-[15%]"
					/>
				</picture>
			</figure>
		</section>
	)
}
