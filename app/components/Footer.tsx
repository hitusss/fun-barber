import { Logo } from "~/components/Logo";
import {
  InstagramIcon,
  TwitterIcon,
  FacebookIcon,
  RSSIcon,
} from "~/components/Icons";

export function Footer() {
  return (
    <footer className="flex w-full flex-col items-center justify-around gap-4 bg-brand py-10 lg:flex-row">
      <div className="flex flex-col gap-8">
        <Logo />
        <div className="flex flex-wrap gap-6 fill-white text-white">
          <a
            href="https://instagram.com/funbarber___"
            aria-label="funbarber on instagram"
            className="flex items-center gap-2"
          >
            <InstagramIcon />
          </a>
          <a
            href="https://twitter.com/funbarber___"
            aria-label="funbarber on twitter"
            className="flex items-center gap-2 fill-white"
          >
            <TwitterIcon />
          </a>
          <a
            href="https://facebook.com/funbarber___"
            aria-label="funbarber on facebook"
            className="flex items-center gap-2"
          >
            <FacebookIcon />
          </a>
          <a
            href="https://funbarber.hitus.me/blog/rss.xml"
            aria-label="funbarber blog rss"
            className="flex items-center gap-2 fill-white"
          >
            <RSSIcon />
          </a>
        </div>
      </div>
      <div className="text-center text-sm lg:text-left">
        <h2 className="mb-2 text-2xl">Contact</h2>
        <p>
          <strong>Adress:</strong> 2087 Despard Street, Atlanta, GA
        </p>
        <p>
          <strong>Phone:</strong> +1 404-312-0263
        </p>
        <p>
          <strong>Email:</strong> contact@funbarb.com
        </p>
      </div>
      <div className="text-center text-sm lg:text-left">
        <h2 className="mb-2 text-2xl">Opening Hours</h2>
        <p>Monday - Friday 9am - 5pm</p>
        <p>Saturday 9am - 3pm</p>
        <p>Sunday CLOSED</p>
      </div>
    </footer>
  );
}
