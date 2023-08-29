import * as React from 'react'
import clsx from 'clsx'

type ButtonProps = {
	size?: 'small' | 'large'
	color?: 'dark' | 'light'
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
	size = 'small',
	color = 'light',
	children,
	className,
	...props
}: ButtonProps) {
	return (
		<button
			className={clsx(
				'border-4 border-current drop-shadow-lg transition hover:scale-110 hover:text-brand focus:scale-110 focus:border-brand focus:text-brand disabled:scale-90 disabled:cursor-default',
				{
					'text-gray-d disabled:text-gray-l': color === 'dark',
					'text-white disabled:text-gray-l': color === 'light',
					'px-16 py-6 text-3xl': size === 'large',
					'px-8 py-4 text-2xl': size === 'small',
				},
				className,
			)}
			{...props}
		>
			{children}
		</button>
	)
}
