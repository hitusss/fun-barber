import * as React from "react";
import type { Moment } from "moment";
import moment from "moment";
import type { Booking } from "~/models/booking.server";
import { RadioButton } from "~/components/RadioButton";

function CalendarBody({
  date,
  setSelectedDay,
  booked,
  register,
}: {
  date: moment.Moment;
  setSelectedDay: (value: number) => void;
  booked: Pick<Booking, "date" | "hour">[];
  register: Function;
}) {
  const currentDate = moment().format("YYYY-MM-DD");
  const currentDay = moment().date();

  const handleSelectDay = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDay(moment(e.target.value).date());
  };

  const dayCells: React.ReactNode[] = [];

  const firstDay = +moment(date).startOf("month").format("d");
  for (let i = 0; i < firstDay; i++) {
    dayCells.push(<td key={`empty${i}`} />);
  }

  for (let d = 1; d <= date.daysInMonth(); d++) {
    const dDate = moment(date).date(d);
    const bookedForDay = booked.filter(
      ({ date }) => new Date(date).getDate() === d
    );
    const availableSpots =
      dDate.format("ddd") === "Sat"
        ? 6 - bookedForDay.length
        : 8 - bookedForDay.length;
    const disabled =
      availableSpots <= 0 ||
      (d <= currentDay && date.format("YYYY-MM-DD") === currentDate) ||
      dDate.format("ddd") === "Sun";

    dayCells.push(
      <td key={d} className="h-12 w-12 md:h-20 md:w-20">
        <RadioButton
          {...register("dateString")}
          value={dDate.toLocaleString()}
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

  const calendar: React.ReactNode[] = [];

  dayCells.reduce((prev, curr, i) => {
    if (i === dayCells.length - 1 || (i + 1) % 7 === 0) {
      calendar.push(
        <tr key={`tr${i}`}>
          {prev}
          {curr}
        </tr>
      );
      return [];
    }
    return prev instanceof Array ? [...prev, curr] : [prev, curr];
  }, []);

  return <>{...calendar}</>;
}

function HoursGrid({
  date,
  booked,
  register,
}: {
  date: moment.Moment;
  booked: Pick<Booking, "date" | "hour">[];
  register: Function;
}) {
  const dateString = date.toISOString();
  const isSat = date.format("ddd") === "Sat";
  const workingHours = isSat ? 6 : 8;
  date.hour(9).minute(0);
  const hours = [];
  for (let i = 0; i < workingHours; i++) {
    const formateHour = date.format("hh:mm A");
    hours.push(
      <RadioButton
        {...register("hour")}
        key={formateHour}
        value={formateHour}
        label={formateHour}
        disabled={booked.some(({ hour }) => hour === formateHour)}
        className="flex h-14 w-full items-center justify-center rounded-full bg-brand shadow-md hover:bg-brand/75 peer-checked:bg-brand/50 peer-focus:bg-brand/75 peer-disabled:bg-brand/25"
      />
    );
    date.add(1, "hours");
  }

  React.useEffect(() => {
    const firstAvailableHour = document.querySelector(
      "input[name=hour]:not([disabled])"
    ) as HTMLInputElement | null;
    firstAvailableHour?.click();
  }, [dateString]);

  return <>{...hours}</>;
}

function MonthSwitcher({
  date,
  monthName,
  year,
  handleMonthChange,
}: {
  date: Moment;
  monthName: string;
  year: string;
  handleMonthChange: (newDate: moment.Moment) => void;
}) {
  return (
    <tr className="bg-brand">
      <th colSpan={2}>
        <button
          type="button"
          className="flex h-10 w-full items-center justify-center text-text/50 hover:text-text md:h-16"
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
      <th className="text-center text-text" colSpan={3} tabIndex={0}>
        <h2 className="md:text-xl">
          {monthName} {year}
        </h2>
      </th>
      <th colSpan={2}>
        <button
          type="button"
          className="flex h-10 w-full items-center justify-center text-text/50 hover:text-text md:h-16"
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

export function BookingCalendar({
  barber,
  register,
}: {
  barber: string;
  register: Function;
}) {
  const [date, setDate] = React.useState(() => moment());
  const [month, setMonth] = React.useState(date.format("MM"));
  const [monthName, setMonthName] = React.useState(date.format("MMMM"));
  const [year, setYear] = React.useState(date.format("YYYY"));
  const [selectedDay, setSelectedDay] = React.useState<number>();
  const [booked, setBooked] = React.useState<Pick<Booking, "date" | "hour">[]>(
    []
  );

  const handleMonthChange = React.useCallback((newDate: Moment) => {
    setDate(newDate);
    setMonth(newDate.format("MM"));
    setMonthName(newDate.format("MMMM"));
    setYear(newDate.format("YYYY"));
  }, []);

  React.useEffect(() => {
    fetch(`/api/v1/booking?barber=${barber}&month=${month}&year=${year}`)
      .then((res) => res.json())
      .then((res) => {
        setBooked(res);
      });
  }, [barber, month, year]);

  React.useEffect(() => {
    const firstAvailableDay = document.querySelector(
      "input[name=dateString]:not([disabled])"
    ) as HTMLInputElement | null;
    if (firstAvailableDay) {
      firstAvailableDay.click();
    } else {
      handleMonthChange(date.add(1, "months"));
    }
  }, [handleMonthChange, date, booked]);

  return (
    <div className="flex flex-col overflow-hidden rounded-lg px-2 drop-shadow-md xl:flex-row xl:px-0">
      <table className="w-[336px] overflow-hidden bg-background md:w-[560px]">
        <thead>
          <MonthSwitcher
            date={date}
            monthName={monthName}
            year={year}
            handleMonthChange={handleMonthChange}
          />
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
            setSelectedDay={setSelectedDay}
            booked={booked}
            register={register}
          />
        </tbody>
      </table>

      <div className="flex w-[336px] flex-col items-center gap-4 bg-background p-6 md:w-[560px]">
        <h2 tabIndex={0}>Available hours:</h2>
        {selectedDay ? (
          <div className="grid w-5/6 grid-cols-2 gap-4">
            <HoursGrid
              date={moment(date).date(selectedDay)}
              booked={booked.filter(
                ({ date }) => new Date(date).getDate() === selectedDay
              )}
              register={register}
            />
          </div>
        ) : (
          <p className="font-bold text-brand">Please select a day!</p>
        )}
      </div>
    </div>
  );
}
