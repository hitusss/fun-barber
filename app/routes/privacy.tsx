import { Heading } from "~/components/Heading";

export default function Privacy() {
  return (
    <div className="mx-auto flex max-w-screen-xl flex-col gap-5">
      <Heading>Privacy</Heading>
      <p>
        This is only preview site for
        <br />
        <a
          href="https://github.com/Hitusss/fun-barber"
          className="text-blue-600 underline"
        >
          github.com/Hitusss/fun-barber
        </a>
      </p>
    </div>
  );
}
