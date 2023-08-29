import * as React from 'react'
import clsx from 'clsx'

export function Heading({
	children,
	className,
	...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
	return (
		<div
			className={clsx(
				'flex items-center gap-3 drop-shadow-lg',
				'before:w-16 before:border-b-4 before:border-brand lg:before:w-24',
				'after:w-16 after:border-b-4 after:border-brand lg:after:w-24',
			)}
		>
			<h1 className={clsx('text-heading2 text-brand', className)} {...props}>
				{children}
			</h1>
		</div>
	)
}
