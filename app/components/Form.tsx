export type ListOfErrors = Array<string | null | undefined> | null | undefined

export function ErrorList({
	id,
	errors,
}: {
	errors?: ListOfErrors
	id?: string
}) {
	const errorsToRender = errors?.filter(Boolean)
	if (!errorsToRender?.length) return null
	return (
		<ul id={id}>
			{errorsToRender.map(e => (
				<li key={e} className="text-sm text-red-700">
					{e}
				</li>
			))}
		</ul>
	)
}
