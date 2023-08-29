import * as React from 'react'
import clsx from 'clsx'

type ErrorComponentProps = {
	size?: 'small' | 'medium' | 'large'
} & React.HTMLAttributes<HTMLDivElement>

export function ErrorComponent({
	size = 'small',
	className,
	...props
}: ErrorComponentProps) {
	return (
		<div
			role="alert"
			className={clsx(
				'text-red-700 shadow-sm',
				{
					'text-sm': size === 'small',
					'text-xl': size === 'medium',
					'text-4xl': size === 'large',
				},
				className,
			)}
			{...props}
		/>
	)
}
