import { useReducedMotion as fmUseReducedMotion } from 'framer-motion'

export function useReducedMotion() {
	const reducedMotion = fmUseReducedMotion()
	return {
		duration: reducedMotion ? 0 : 0.5,
		reducedMotion,
	}
}
