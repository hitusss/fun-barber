import type { GalleryImage } from "~/types.tsx";
import { Heading } from "~/components/Heading.tsx";

export function Gallery({ gallery }: { gallery: GalleryImage[] }) {
  return (
    <section id="gallery" className="flex flex-col justify-center gap-8 py-32">
      <div className="pl-4 lg:pl-16">
        <Heading>Gallery</Heading>
      </div>
      <ul className="mx-8 flex snap-x gap-4 overflow-x-auto overscroll-contain scroll-smooth py-2">
        {gallery.map((item) => (
          <li key={item.name} className="shrink-0 grow-0 snap-center">
            <figure>
              <picture>
                <source
                  srcSet={`${item.image.url}?w=300&h=300&fm=webp`}
                  type="images/webp"
                />
                <source
                  srcSet={`${item.image.url}?w=300&h=300&fm=jpg`}
                  type="images/jpeg"
                />
                <img
                  src={`${item.image.url}?w=300&h=300&fm=jpg`}
                  alt=""
                  className="h-72 w-56 object-cover"
                />
              </picture>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
