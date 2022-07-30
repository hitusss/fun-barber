import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getBookings } from "~/models/booking.server";

type LoaderData = {};

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const barber = url.searchParams.get("barber");
  const month = Number(url.searchParams.get("month"));
  const year = Number(url.searchParams.get("year"));

  if (!barber || !month) {
    return Promise.reject(new Error("Missing barber or month"));
  }

  const bookings = await getBookings(barber, month, year);
  return json<LoaderData>(bookings);
}
