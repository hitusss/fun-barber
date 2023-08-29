export function startEndMonth(month: number, year?: number) {
	const startDate = new Date(
		year || new Date().getFullYear(),
		month - 1,
		1,
		0,
		0,
		0,
		0,
	)
	const endDate = new Date(
		year || new Date().getFullYear(),
		month,
		0,
		23,
		59,
		59,
		59,
	)

	return { startDate, endDate }
}
