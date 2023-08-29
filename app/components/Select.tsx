import * as React from 'react'
import clsx from 'clsx'

type SelectProps = {
	name: string
	options: string[]
	label: string
} & React.SelectHTMLAttributes<HTMLSelectElement>

export const Select = React.forwardRef(
	(
		{ name, options, label, className, ...props }: SelectProps,
		ref: React.LegacyRef<HTMLSelectElement>,
	) => (
		<label className="my-2 w-full">
			<span className="px-4" id={label}>
				{label}
			</span>
			<select
				ref={ref}
				name={name}
				className={clsx(
					'block w-full rounded-lg bg-gray-d px-6 py-4 drop-shadow-md',
					className,
				)}
				defaultValue={options[0]}
				{...props}
			>
				{options.map((option, index) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
		</label>
	),
)

Select.displayName = 'Select'
