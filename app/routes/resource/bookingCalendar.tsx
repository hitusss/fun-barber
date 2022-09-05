import * as React from "react";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useFetcher, useSearchParams } from "@remix-run/react";
import type { Moment } from "moment";
import moment from "moment";
import { useSpinDelay } from "spin-delay";
import type { Booking } from "~/models/booking.server";
import { getBookings } from "~/models/booking.server";
import { getAllSearchParams } from "~/utils";
import { RadioButton } from "~/components/RadioButton";
import { Spinner } from "~/components/Spinner";

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const barber = url.searchParams.get("barber");
  const month = Number(url.searchParams.get("month"));
  const year = Number(url.searchParams.get("year"));

  if (!barber || !month || !year) return json([]);

  const bookings = await getBookings(barber, month, year);
  return json(bookings);
}

export default function BookingCalendar({ barber }: { barber: string }) {
  const bookingCalendarFetcher = useFetcher<Pick<Booking, "date" | "hour">[]>();
  const [searchParams, setSearchParams] = useSearchParams();
  const showSpinner = useSpinDelay(bookingCalendarFetcher.state !== "idle", {
    delay: 200,
    minDuration: 300,
  });
  const booked = bookingCalendarFetcher.data;
  const day = searchParams.get("day");
  const month = searchParams.get("month");
  const year = searchParams.get("year");
  const hour = searchParams.get("hour");
  const date = moment({
    year: Number(year),
    month: Number(month) - 1,
    day: Number(day) || 1,
  });

  const handleMonthChange = (newDate: moment.Moment) => {
    setSearchParams({
      ...getAllSearchParams(searchParams),
      month: newDate.format("MM"),
      year: newDate.format("YYYY"),
      day: "",
      hour: "",
    });
  };

  const handleDaySelect = (newDay: string) => {
    setSearchParams({
      ...getAllSearchParams(searchParams),
      day: newDay,
    });
  };

  const handleHourSelect = (newHour: string) => {
    setSearchParams({
      ...getAllSearchParams(searchParams),
      hour: newHour,
    });
  };

  React.useEffect(() => {
    if (!month || !year || !date.isValid()) {
      const newDate = moment();
      setSearchParams({
        month: newDate.format("MM"),
        year: newDate.format("YYYY"),
        ...getAllSearchParams(searchParams),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (!month || !year || !barber) return;
    bookingCalendarFetcher.submit(
      { barber, month, year },
      { method: "get", action: "/resource/bookingCalendar" }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, year, barber]);

  React.useEffect(() => {
    if (!date.isValid() || !booked) return;

    const allDays = document.querySelectorAll(
      `input[name=day]:not([disabled])`
    ) as NodeListOf<HTMLInputElement>;

    if (day) {
      const selectedDay = Array.from(allDays).find(
        (dayInput) => dayInput.value === day
      );
      if (selectedDay) {
        selectedDay.click();
        return;
      }
    }

    const firstAvailableDay = allDays[0];
    if (firstAvailableDay) {
      firstAvailableDay.click();
      return;
    }

    handleMonthChange(date.add(1, "months"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showSpinner, booked, month, year]);

  React.useEffect(() => {
    if (!date.isValid() || !booked) return;
    const allHours = document.querySelectorAll(
      `input[name=hour]:not([disabled])`
    ) as NodeListOf<HTMLInputElement>;

    if (hour) {
      const selectedHour = Array.from(allHours).find(
        (hourInput) => hourInput.value === hour
      );
      if (selectedHour) {
        selectedHour.click();
        return;
      }
    }

    const firstAvailableHour = allHours[0];
    firstAvailableHour?.click();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showSpinner, booked, day, month, year]);

  if (!date.isValid()) {
    return (
      <div className="flex min-h-[530px] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex min-h-[530px] flex-col overflow-hidden rounded-lg px-2 drop-shadow-md xl:flex-row xl:px-0">
      <input type="hidden" name="year" value={year || ""} />
      <input type="hidden" name="month" value={month || ""} />
      {showSpinner && (
        <div className="absolute flex h-full w-full items-center justify-center bg-gray-d/25">
          <Spinner />
        </div>
      )}

      <fieldset disabled={showSpinner}>
        <table className="w-[336px] overflow-hidden bg-gray-d md:w-[560px]">
          <thead>
            <MonthSwitcher date={date} handleMonthChange={handleMonthChange} />
            <tr className="bg-brand/75">
              {moment.weekdaysShort().map((day) => (
                <th key={day} className="h-10 w-12 md:h-16 md:w-20">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <CalendarBody
              date={date}
              handleDaySelect={handleDaySelect}
              booked={booked}
            />
          </tbody>
        </table>
      </fieldset>

      <div className="flex w-[336px] flex-col items-center gap-4 bg-gray-d p-6 md:w-[560px]">
        <h2 tabIndex={0}>Available hours:</h2>
        {day ? (
          <fieldset
            className="grid w-full grid-cols-2 gap-4"
            disabled={showSpinner}
          >
            <HoursGrid
              date={date}
              handleHourSelect={handleHourSelect}
              booked={booked?.filter(
                ({ date }) => new Date(date).getDate() === Number(day)
              )}
            />
          </fieldset>
        ) : (
          <p className="font-bold text-brand">Please select a day!</p>
        )}
      </div>
    </div>
  );
}

function MonthSwitcher({
  date,
  handleMonthChange,
}: {
  date: Moment;
  handleMonthChange: (newDate: moment.Moment) => void;
}) {
  return (
    <tr className="bg-brand">
      <th colSpan={2}>
        <button
          type="button"
          className="flex h-10 w-full items-center justify-center text-white/50 hover:text-white md:h-16"
          onClick={() => handleMonthChange(date.subtract(1, "months"))}
          disabled={moment().isSame(date, "month")}
          aria-label="Previous month"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
      </th>
      <th className="text-center" colSpan={3} tabIndex={0}>
        <h2 className="md:text-xl">
          {date.format("MMMM")} {date.format("YYYY")}
        </h2>
      </th>
      <th colSpan={2}>
        <button
          type="button"
          className="flex h-10 w-full items-center justify-center text-white/50 hover:text-white md:h-16"
          onClick={() => handleMonthChange(date.add(1, "months"))}
          aria-label="Next month"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </th>
    </tr>
  );
}

function CalendarBody({
  date,
  handleDaySelect,
  booked,
}: {
  date: moment.Moment;
  handleDaySelect: (newDay: string) => void;
  booked?: Pick<Booking, "date" | "hour">[];
}) {
  const currentDate = moment().format("YYYY-MM");
  const currentDay = moment().date();

  const handleSelectDay = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDaySelect(e.target.value);
  };

  const dayCells: React.ReactNode[] = [];

  const firstDay = +moment(date).startOf("month").format("d");
  for (let i = 0; i < firstDay; i++) {
    dayCells.push(<td key={`empty${i}`} />);
  }

  for (let d = 1; d <= date.daysInMonth(); d++) {
    const dDate = moment(date).date(d);
    const bookedForDay =
      booked?.filter(({ date }) => new Date(date).getDate() === d) || [];
    const availableSpots =
      dDate.format("ddd") === "Sat"
        ? 6 - bookedForDay.length
        : 8 - bookedForDay.length;
    const disabled =
      availableSpots <= 0 ||
      (date.format("YYYY-MM") === currentDate && d <= currentDay) ||
      dDate.format("ddd") === "Sun";

    dayCells.push(
      <td key={d} className="h-12 w-12 md:h-20 md:w-20">
        <RadioButton
          name="day"
          value={d}
          label={
            <>
              {d}
              {!disabled && (
                <div className="text-xs text-brand/75 md:text-sm">
                  {availableSpots}
                  spots
                </div>
              )}
            </>
          }
          disabled={disabled}
          className="flex aspect-square h-3/4 flex-col items-center justify-center rounded-full p-0 text-center hover:bg-brand/75 peer-checked:bg-brand peer-focus:bg-brand/75"
          onChange={handleSelectDay}
        />
      </td>
    );
  }

  const calendarBody: React.ReactNode[] = [];

  dayCells.reduce((prev, curr, i) => {
    if (i === dayCells.length - 1 || (i + 1) % 7 === 0) {
      calendarBody.push(
        <tr key={`tr${i}`}>
          {prev}
          {curr}
        </tr>
      );
      return [];
    }
    return prev instanceof Array ? [...prev, curr] : [prev, curr];
  }, []);

  return <>{...calendarBody}</>;
}

function HoursGrid({
  date,
  handleHourSelect,
  booked,
}: {
  date: moment.Moment;
  handleHourSelect: (newHour: string) => void;
  booked?: Pick<Booking, "date" | "hour">[];
}) {
  const isSat = date.format("ddd") === "Sat";
  const workingHours = isSat ? 6 : 8;
  date.hour(9).minute(0);

  const handleSelectHour = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleHourSelect(e.target.value);
  };

  const hours = [];
  for (let i = 0; i < workingHours; i++) {
    const formateHour = date.format("hh:mm A");
    hours.push(
      <RadioButton
        name="hour"
        key={formateHour}
        value={formateHour}
        label={formateHour}
        disabled={booked?.some(({ hour }) => hour === formateHour)}
        className="flex h-14 w-full items-center justify-center rounded-full bg-brand shadow-md hover:bg-brand/75 peer-checked:bg-brand/50 peer-focus:bg-brand/75 peer-disabled:bg-brand/25"
        onChange={handleSelectHour}
      />
    );
    date.add(1, "hours");
  }

  return <>{...hours}</>;
}
