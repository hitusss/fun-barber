import type { GalleryImage } from "~/types";
import { Heading } from "~/components/Heading";

export function Gallery({ gallery }: { gallery: GalleryImage[] }) {
  return (
    <section id="gallery" className="flex flex-col justify-center gap-8 py-32">
      <div className="pl-4 lg:pl-16">
        <Heading>Gallery</Heading>
      </div>
      <ul className="mx-8 flex snap-x gap-4 overflow-x-auto overscroll-contain scroll-smooth py-2">
        {gallery.map((item) => (
          <li
            key={item.name}
            tabIndex={0}
            className="shrink-0 grow-0 snap-center"
          >
            <figure>
              <picture>
                <source
                  srcSet={`${item.image.url}?w=300&h=300&fm=webp`}
                  type="image/webp"
                />
                <source
                  srcSet={`${item.image.url}?w=300&h=300&fm=jpg`}
                  type="image/jpeg"
                />
                <img
                  src={`${item.image.url}?w=300&h=300&fm=jpg`}
                  alt=""
                  className="h-60 w-48 object-cover"
                />
              </picture>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
