export function getAllSearchParams(searchParams: URLSearchParams) {
	const result: Record<string, string> = {}
	searchParams.forEach((value, key) => {
		result[key] = value
	})
	return result
}
