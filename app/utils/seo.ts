export function getSocialMetas({
  url,
  title = "Fun Barber",
  description = "One of the best barber show nears you.",
  image = `https://funbarber.hitus.me/images/featuredImage.jpg`,
  keywords = "barber shop, barber, fun barber",
}: {
  url: string;
  title?: string;
  description?: string;
  image?: string;
  keywords?: string;
}) {
  return {
    title,
    description,
    keywords,
    image,
    "og:url": url,
    "og:title": title,
    "og:description": description,
    "og:image": image,
    "twitter:card": image ? "summary_large_image" : "summary",
    "twitter:creator": "",
    "twitter:site": "",
    "twitter:title": title,
    "twitter:description": description,
    "twitter:image": image,
    "twitter:alt": title,
  };
}
