import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import type { Barber, GalleryImage, Service } from '~/types.ts'
import { contentful } from '~/services/contentful.server.ts'
import { About } from '~/components/sections/About.tsx'
import { Barbers } from '~/components/sections/Barbers.tsx'
import { Gallery } from '~/components/sections/Gallery.tsx'
import { Hero } from '~/components/sections/Hero.tsx'
import { Services } from '~/components/sections/Services.tsx'

export async function loader() {
	const {
		barbersCollection: { items: barbers },
		servicesCollection: { items: services },
		galleryCollection: { items: gallery },
	} = await contentful<{
		barbersCollection: { items: Barber[] }
		servicesCollection: { items: Service[] }
		galleryCollection: { items: GalleryImage[] }
	}>(`{
    barbersCollection {
      items {
        name
        instagram
        instagramUrl
        avatar {
          url
        }
        bio
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
  }`)

	return json({
		barbers,
		services,
		gallery,
	})
}

export default function Index() {
	const { barbers, services, gallery } = useLoaderData<typeof loader>()
	return (
		<>
			<Hero />
			<div className="bg-black/10 backdrop-blur-xl">
				<About />
				<Barbers barbers={barbers} />
				<Services services={services} />
				<Gallery gallery={gallery} />
			</div>
		</>
	)
}
