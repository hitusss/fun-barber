import { Link } from "@remix-run/react";
import { Heading } from "~/components/Heading";

export default function Privacy() {
  return (
    <div className="mx-auto my-5 flex max-w-screen-xl flex-col gap-5">
      <Heading>Privacy</Heading>
      <p className="max-w-prose text-base">
        The site collect and save only data you provide to booking form, this
        data is stored in private database and only used for properly site work
        (to show booked dates on{" "}
        <Link to="/booking" className="underling text-blue-600">
          /booking
        </Link>
        ).
      </p>
    </div>
  );
}
