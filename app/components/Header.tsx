import * as React from "react";
import { Link, useLocation, useTransition } from "@remix-run/react";
import clsx from "clsx";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuLink,
  MenuPopover,
  useMenuButtonContext,
} from "@reach/menu-button";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useSpinDelay } from "spin-delay";
import { Logo } from "~/components/Logo";
import { Spinner } from "~/components/Spinner";

const links = [
  { name: "Home", to: "/" },
  { name: "About", to: "/#about" },
  { name: "Barbers", to: "/#barbers" },
  { name: "Services", to: "/#services" },
  { name: "Gallery", to: "/#gallery" },
  { name: "Blog", to: "/blog" },
  { name: "Booking", to: "/booking" },
];

function NavLink({ to, children, ...rest }: Parameters<typeof Link>["0"]) {
  const location = useLocation();
  const isSelected = location.hash
    ? to === `${location.pathname}${location.hash}`
    : to === location.pathname || location.pathname.startsWith(`${to}/`);

  return (
    <li>
      <Link
        prefetch="intent"
        className={clsx(
          "text-lg outline-none hover:text-brand/75 focus:text-brand/75",
          {
            "text-brand": isSelected,
          }
        )}
        to={to}
        {...rest}
      >
        {children}
      </Link>
    </li>
  );
}

function MobileMenu() {
  const { isExpanded } = useMenuButtonContext();
  const reducedMotion = useReducedMotion();

  React.useEffect(() => {
    if (isExpanded) {
      // don't use overflow-hidden, as that toggles the scrollbar and causes layout shift
      document.body.classList.add("fixed");
      document.body.classList.add("overflow-y-scroll");
      // alternatively, get bounding box of the menu, and set body height to that.
      document.body.style.height = "100vh";
    } else {
      document.body.classList.remove("fixed");
      document.body.classList.remove("overflow-y-scroll");
      document.body.style.removeProperty("height");
    }
  }, [isExpanded]);

  return (
    <AnimatePresence>
      {isExpanded && (
        <MenuPopover
          position={(r) => ({
            top: `calc(${Number(r?.top) + Number(r?.height)}px + 1.5rem)`,
            left: 0,
            bottom: 0,
            right: 0,
          })}
          style={{ display: "block" }}
          className="z-50"
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{
              duration: reducedMotion ? 0 : 0.15,
            }}
            className="flex h-full flex-col overflow-y-scroll bg-background text-xl"
          >
            <MenuItems className="border-none bg-transparent p-0">
              {links.map((link) => (
                <MenuLink
                  className="border-b border-white py-9 text-center hover:bg-transparent hover:text-brand focus:bg-transparent focus:text-brand"
                  as={Link}
                  key={link.to}
                  to={link.to}
                >
                  {link.name}
                </MenuLink>
              ))}
            </MenuItems>
          </motion.div>
        </MenuPopover>
      )}
    </AnimatePresence>
  );
}

export function Header() {
  const transition = useTransition();
  const showSpinner = useSpinDelay(transition.state !== "idle", {
    delay: 200,
    minDuration: 300,
  });
  return (
    <header className="absolute z-40 flex w-full justify-center px-10 py-6 text-paragraph">
      <div className="flex w-full max-w-screen-xl items-center justify-between">
        <div className="flex items-center gap-5">
          <Link to="/" tabIndex={-1} aria-hidden="true">
            <Logo />
          </Link>
          {showSpinner && <Spinner />}
        </div>
        <nav>
          <ul className="hidden gap-5 text-lg lg:flex">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to}>
                {link.name}
              </NavLink>
            ))}
          </ul>

          <div className="block lg:hidden">
            <Menu>
              {({ isExpanded }) => {
                const state = isExpanded ? "open" : "closed";
                return (
                  <>
                    <MenuButton aria-label="toggle mobile menu button">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <motion.rect
                          animate={state}
                          variants={{
                            open: { rotate: 45, y: 7 },
                            closed: { rotate: 0, y: 0 },
                          }}
                          x="6"
                          y="9"
                          width="20"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        />
                        <motion.rect
                          animate={state}
                          variants={{
                            open: { opacity: 0 },
                            closed: { opacity: 1 },
                          }}
                          x="6"
                          y="15"
                          width="20"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        />
                        <motion.rect
                          animate={state}
                          variants={{
                            open: { rotate: -45, y: -5 },
                            closed: { rotate: 0, y: 0 },
                          }}
                          x="6"
                          y="21"
                          width="20"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        />
                      </svg>
                    </MenuButton>

                    <MobileMenu />
                  </>
                );
              }}
            </Menu>
          </div>
        </nav>
      </div>
    </header>
  );
}
