import { prisma } from "~/utils/db.server";
import { startEndMonth } from "~/utils";

export type { Booking } from "@prisma/client";

export async function getBookings(
  barber: string,
  month: number,
  year?: number
) {
  const { startDate, endDate } = startEndMonth(month, year);

  return prisma.booking.findMany({
    where: {
      barber,
      date: {
        gte: startDate,
        lt: endDate,
      },
    },
    select: {
      date: true,
      hour: true,
    },
  });
}

export async function createBooking({
  firstName,
  lastName,
  phone,
  email,
  barber,
  service,
  dateString,
  hour,
}: {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  barber?: string;
  service?: string;
  dateString?: string;
  hour?: string;
}) {
  if (
    !firstName ||
    !lastName ||
    !phone ||
    !email ||
    !barber ||
    !service ||
    !dateString ||
    !hour
  ) {
    throw new Error("Please fill all fields!");
  }

  const date = new Date(dateString);
  date.setUTCHours(0, 0, 0, 0);

  const isBooked = await prisma.booking.findMany({
    where: {
      barber,
      date,
      hour,
    },
  });

  if (isBooked.length) {
    throw new Error("This time is already booked");
  }

  return prisma.booking.create({
    data: {
      date,
      hour,
      barber,
      service,
      firstName,
      lastName,
      phone,
      email,
    },
  });
}
