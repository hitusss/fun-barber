import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { Barber, Service, GalleryImage } from "~/types";
import { Hero } from "~/components/sections/Hero";
import { About } from "~/components/sections/About";
import { Barbers } from "~/components/sections/Barbers";
import { Services } from "~/components/sections/Services";
import { Gallery } from "~/components/sections/Gallery";
import { contentful } from "~/utils/contentful.server";

type LoaderData = {
  barbers: Barber[];
  services: Service[];
  gallery: GalleryImage[];
};

export async function loader() {
  const {
    barbersCollection: { items: barbers },
    servicesCollection: { items: services },
    galleryCollection: { items: gallery },
  } = await contentful(`{
    barbersCollection {
      items {
        name
        instagram
        instagramUrl
        avatar {
          url
        }
      }
    }
    servicesCollection {
      items {
        name
        price
        description
        icon
      }
    }
    galleryCollection {
      items {
        image {
            url
        }
        name
      }
    }
  }`);

  return json<LoaderData>({
    barbers,
    services,
    gallery,
  });
}

export default function Index() {
  const { barbers, services, gallery } = useLoaderData<LoaderData>();
  return (
    <>
      <Hero />
      <About />
      <Barbers barbers={barbers} />
      <Services services={services} />
      <Gallery gallery={gallery} />
    </>
  );
}
