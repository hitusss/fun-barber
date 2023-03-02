import * as React from "react";
import {
  useLoaderData,
  useFetcher,
  Link,
  useSearchParams,
} from "@remix-run/react";
import type { ActionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import type { Service, Barber } from "~/types";
import type { LoaderData as RootLoaderData } from "~/root";
import { BookingCalendar } from "~/routes/resource/bookingCalendar";
import { Select } from "~/components/Select";
import { Input } from "~/components/Input";
import { Button } from "~/components/Button";
import { contentful } from "~/services/contentful.server";
import { createBooking } from "~/models/booking.server";
import { getAllSearchParams, getSocialMetas, getUrl, useForm } from "~/utils";

type LoaderData = {
  barbers: Pick<Barber, "name">[];
  services: Pick<Service, "name" | "price">[];
};

const bookingSchema = z.object({
  barber: z.string(),
  service: z.string(),
  year: z.string(),
  month: z.string(),
  day: z.string(),
  hour: z.string(),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email(),
  phone: z.string().regex(/[0-9]{9}/, { message: "Invalid phone number" }),
  privacyPolicy: z.literal("privacyPolicy", {
    errorMap: () => ({
      message: "You must accept Privacy Policy.",
    }),
  }),
});

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const dataObj = Object.fromEntries(formData);

  const validData = bookingSchema.safeParse(dataObj);
  if (!validData.success) {
    const fieldErrors: Record<string, string[]> = {};
    validData.error.errors.map((e) =>
      e.path.forEach((p) => {
        if (fieldErrors[p]) {
          fieldErrors[p].push(e.message);
        } else {
          fieldErrors[p] = [e.message];
        }
      })
    );
    return json(
      { ok: false, errors: { fieldErrors, formErrors: null } },
      { status: 400 }
    );
  }

  try {
    const result = await createBooking(validData.data);
    return json({ ...result, ok: true });
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : JSON.stringify(error);
    return json(
      {
        ok: false,
        errors: { fieldErrors: null, formErrors: [errorMsg] },
      },
      { status: 400 }
    );
  }
}

export async function loader() {
  const {
    barbersCollection: { items: barbers },
    servicesCollection: { items: services },
  } = await contentful(`{
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
  }`);

  return json<LoaderData>({
    barbers,
    services,
  });
}

export const meta: MetaFunction = ({ parentsData }) => {
  const { requestInfo } = parentsData.root as RootLoaderData;
  return {
    ...getSocialMetas({
      title: "Booking | Fun Barber",
      description: "Book your visit in our barber shop.",
      keywords: "barber, barber shop, fun barber, booking",
      origin: requestInfo?.origin ?? "",
      url: getUrl(requestInfo),
    }),
  };
};

export default function Booking() {
  const bookingFetcher = useFetcher();
  const { barbers, services } = useLoaderData<LoaderData>();
  const [searchParams, setSearchParams] = useSearchParams();
  const reducedMotion = useReducedMotion();
  const formRef = React.useRef<HTMLFormElement>(null);
  const successRef = React.useRef<HTMLHeadingElement>(null);
  const { form, fields } = useForm({
    name: "booking",
    formRef,
    schema: bookingSchema,
    errors: bookingFetcher.data?.errors,
  });

  const barber = searchParams.get("barber") || barbers[0].name;
  const service =
    searchParams.get("service") ||
    `${services[0].name} (${services[0].price}$)`;

  const isSuccess = bookingFetcher?.data?.ok;

  const duration = reducedMotion ? 0 : 0.5;
  const variants = {
    visible: {
      opacity: 1,
      scale: 1,
      display: "block",
    },
    hidden: {
      opacity: 0,
      scale: 0.7,
      display: "none",
    },
  };

  React.useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        successRef.current && successRef.current.focus();
      }, duration * 100);
    }
  }, [duration, isSuccess]);

  return (
    <div className="mx-auto flex min-h-screen max-w-screen-xl flex-col items-center justify-center">
      <AnimatePresence>
        <motion.div
          key="bookingForm"
          initial={variants.hidden}
          animate={isSuccess ? "hidden" : "visible"}
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
                  onChange={(e) =>
                    setSearchParams({
                      ...getAllSearchParams(searchParams),
                      barber: e.target.value,
                    })
                  }
                  label="Barber"
                  required
                  {...fields.barber.props}
                />
                {fields.barber.errors}
              </div>
              <div>
                <Select
                  options={services.map(
                    ({ name, price }) => `${name} (${price}$)`
                  )}
                  defaultValue={service}
                  onChange={(e) =>
                    setSearchParams({
                      ...getAllSearchParams(searchParams),
                      service: e.target.value,
                    })
                  }
                  label="Service"
                  required
                  {...fields.service.props}
                />
                {fields.service.errors}
              </div>
            </fieldset>
            <BookingCalendar barber={barber} />
            <fieldset className="grid w-4/5 grid-cols-1 rounded-lg bg-white/5 p-10 md:grid-cols-2 md:gap-8">
              <div>
                <Input
                  label="First name"
                  required
                  {...fields.firstName.props}
                />
                {fields.firstName.errors}
              </div>
              <div>
                <Input label="Last name" required {...fields.lastName.props} />
                {fields.lastName.errors}
              </div>
              <div>
                <Input
                  label="Email"
                  type="email"
                  required
                  {...fields.email.props}
                />
                {fields.email.errors}
              </div>
              <div>
                <Input
                  label="Phone"
                  type="tel"
                  required
                  {...fields.phone.props}
                />
                {fields.phone.errors}
              </div>
            </fieldset>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                value="privacyPolicy"
                {...fields.privacyPolicy.props}
              />{" "}
              I accept the{" "}
              <Link to="/privacy" className="text-blue-600 underline">
                Privacy Policy
              </Link>
            </label>
            {fields.privacyPolicy.errors}
            <Button
              className="my-4 px-16"
              type="submit"
              disabled={Boolean(bookingFetcher.submission)}
            >
              {bookingFetcher.submission ? "Booking..." : "Book"}
            </Button>
            {form.errors}
          </bookingFetcher.Form>
        </motion.div>

        <motion.div
          key="successNotification"
          initial={variants.hidden}
          animate={isSuccess ? "visible" : "hidden"}
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
  );
}

export const shouldRevalidate = () => false;
