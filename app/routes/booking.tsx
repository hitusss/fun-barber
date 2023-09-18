import * as React from 'react'
import type { ActionFunctionArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import {
	Link,
	useFetcher,
	useLoaderData,
	useSearchParams,
} from '@remix-run/react'
import { conform, useForm } from '@conform-to/react'
import { getFieldsetConstraint, parse } from '@conform-to/zod'
import { AnimatePresence, motion } from 'framer-motion'
import { z } from 'zod'

import type { Barber, Service } from '~/types.ts'
import { createBooking } from '~/models/booking.server.ts'
import { contentful } from '~/services/contentful.server.ts'
import { BookingCalendar } from '~/routes/resource+/bookingCalendar.tsx'
import { Button } from '~/components/Button.tsx'
import { ErrorList } from '~/components/Form.tsx'
import { Input } from '~/components/Input.tsx'
import { Select } from '~/components/Select.tsx'
import {
	getAllSearchParams,
	getMetas,
	getUrl,
	useReducedMotion,
} from '~/utils/index.ts'
import type { LoaderData as RootLoaderData } from '~/root.tsx'

const bookingSchema = z.object({
	barber: z.string(),
	service: z.string(),
	year: z.string(),
	month: z.string(),
	day: z.string(),
	hour: z.string(),
	firstName: z.string().min(1, { message: 'First name is required' }),
	lastName: z.string().min(1, { message: 'Last name is required' }),
	email: z.string().email(),
	phone: z.string().regex(/[0-9]{9}/, { message: 'Invalid phone number' }),
	privacyPolicy: z.literal('privacyPolicy', {
		errorMap: () => ({
			message: 'You must accept Privacy Policy.',
		}),
	}),
})

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData()
	const submission = parse(formData, { schema: bookingSchema })

	if (submission.intent !== 'submit' || !submission.value) {
		return json({ ok: false, error: null, submission } as const)
	}

	try {
		await createBooking(submission.value)
		return json({ ok: true, error: null, submission } as const)
	} catch (error) {
		const errorMsg =
			error instanceof Error ? error.message : JSON.stringify(error)
		return json(
			{
				ok: false,
				error: errorMsg,
				submission,
			} as const,
			{ status: 400 },
		)
	}
}

export async function loader() {
	const {
		barbersCollection: { items: barbers },
		servicesCollection: { items: services },
	} = await contentful<{
		barbersCollection: { items: Pick<Barber, 'name'>[] }
		servicesCollection: { items: Pick<Service, 'name' | 'price'>[] }
	}>(`{
    barbersCollection {
      items {
        name
      }
    }
    servicesCollection {
      items {
        name
        price
      }
    }
  }`)

	return json({
		barbers,
		services,
	})
}

export const meta: MetaFunction<typeof loader, { root: RootLoaderData }> = ({
	matches,
}) => {
	const requestInfo = matches.find(m => m.id === 'root')?.data.requestInfo
	return getMetas({
		url: getUrl(requestInfo),
		origin: requestInfo?.origin ?? '',
		title: 'Booking',
		description: 'Book your visit in our barber shop.',
		keywords: 'barber, barber shop, fun barber, booking',
	})
}

export default function Booking() {
	const bookingFetcher = useFetcher<typeof action>()
	const { barbers, services } = useLoaderData<typeof loader>()
	const [searchParams, setSearchParams] = useSearchParams()
	const { duration } = useReducedMotion()
	const successRef = React.useRef<HTMLHeadingElement>(null)
	const [form, fields] = useForm({
		id: 'booking',
		lastSubmission: bookingFetcher.data?.submission,
		constraint: getFieldsetConstraint(bookingSchema),
		onValidate({ formData }) {
			return parse(formData, { schema: bookingSchema })
		},
		shouldValidate: 'onBlur',
	})

	const barber = searchParams.get('barber') || barbers[0]?.name
	const service =
		searchParams.get('service') ||
		`${services[0]?.name} (${services[0]?.price}$)`

	const isSuccess = bookingFetcher?.data?.ok

	const variants = {
		visible: {
			opacity: 1,
			scale: 1,
			display: 'block',
		},
		hidden: {
			opacity: 0,
			scale: 0.7,
			display: 'none',
		},
	}

	React.useEffect(() => {
		if (isSuccess) {
			setTimeout(() => {
				successRef.current && successRef.current.focus()
			}, duration * 100)
		}
	}, [duration, isSuccess])

	return (
		<div className="mx-auto flex min-h-screen max-w-screen-xl flex-col items-center justify-center">
			<AnimatePresence>
				<motion.div
					key="bookingForm"
					initial={variants.hidden}
					animate={isSuccess ? 'hidden' : 'visible'}
					variants={variants}
					transition={{
						duration,
					}}
				>
					<bookingFetcher.Form
						method="post"
						className="flex flex-col items-center gap-4"
						{...form.props}
					>
						<fieldset className="grid w-3/4 grid-cols-1 md:grid-cols-2 md:gap-8">
							<div>
								<Select
									options={barbers.map(({ name }) => name)}
									defaultValue={barber}
									onChange={e =>
										setSearchParams({
											...getAllSearchParams(searchParams),
											barber: e.target.value,
										})
									}
									label="Barber"
									required
									{...conform.select(fields.barber)}
								/>
								<ErrorList
									id={fields.barber?.errorId}
									errors={fields.barber?.errors}
								/>
							</div>
							<div>
								<Select
									options={services.map(
										({ name, price }) => `${name} (${price}$)`,
									)}
									defaultValue={service}
									onChange={e =>
										setSearchParams({
											...getAllSearchParams(searchParams),
											service: e.target.value,
										})
									}
									label="Service"
									required
									{...conform.select(fields.service)}
								/>
								<ErrorList
									id={fields.service?.errorId}
									errors={fields.service?.errors}
								/>
							</div>
						</fieldset>
						<BookingCalendar barber={barber} />
						<fieldset className="grid w-4/5 grid-cols-1 rounded-lg bg-white/5 p-10 md:grid-cols-2 md:gap-8">
							<div>
								<Input
									label="First name"
									required
									{...conform.input(fields.firstName, { type: 'text' })}
								/>
								<ErrorList
									id={fields.firstName?.errorId}
									errors={fields.firstName?.errors}
								/>
							</div>
							<div>
								<Input
									label="Last name"
									required
									{...conform.input(fields.lastName, { type: 'text' })}
								/>
								<ErrorList
									id={fields.lastName?.errorId}
									errors={fields.lastName?.errors}
								/>
							</div>
							<div>
								<Input
									label="Email"
									required
									{...conform.input(fields.email, { type: 'email' })}
								/>
								<ErrorList
									id={fields.email?.errorId}
									errors={fields.email?.errors}
								/>
							</div>
							<div>
								<Input
									label="Phone"
									required
									{...conform.input(fields.phone, { type: 'tel' })}
								/>
								<ErrorList
									id={fields.phone?.errorId}
									errors={fields.phone?.errors}
								/>
							</div>
						</fieldset>
						<label className="flex items-center gap-2 text-sm">
							<input
								{...conform.input(fields.privacyPolicy, {
									type: 'checkbox',
									value: 'privacyPolicy',
								})}
							/>{' '}
							I accept the{' '}
							<Link to="/privacy" className="text-blue-600 underline">
								Privacy Policy
							</Link>
						</label>
						<ErrorList
							id={fields.privacyPolicy?.errorId}
							errors={fields.privacyPolicy?.errors}
						/>
						<Button
							className="my-4 px-16"
							type="submit"
							disabled={bookingFetcher.state === 'submitting'}
						>
							{bookingFetcher.state === 'submitting' ? 'Booking...' : 'Book'}
						</Button>
						<ErrorList
							id={form.errorId}
							errors={[...form.errors, bookingFetcher.data?.error]}
						/>
					</bookingFetcher.Form>
				</motion.div>

				<motion.div
					key="successNotification"
					initial={variants.hidden}
					animate={isSuccess ? 'visible' : 'hidden'}
					variants={variants}
					transition={{
						duration,
					}}
					className="absolute flex -translate-y-32 flex-col items-center gap-4 text-center"
				>
					<h2 tabIndex={-1} ref={successRef} className="text-3xl font-bold">
						Booking successful
					</h2>
					<p className="text-base">Thank you for booking with us.</p>
					<Link
						to="."
						reloadDocument
						className="text-xl text-brand underline hover:text-brand/75 focus:text-brand/75"
					>
						Book another appointment
					</Link>
				</motion.div>
			</AnimatePresence>
		</div>
	)
}

export const shouldRevalidate = () => false
