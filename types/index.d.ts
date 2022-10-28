import type { Document } from "@contentful/rich-text-types";

export type Service = {
  name: string;
  price: number;
  description: string;
  icon: string;
};

export type Barber = {
  name: string;
  instagram: string;
  instagramUrl: string;
  avatar: {
    url: string;
  };
  bio: string;
};

export type GalleryImage = {
  image: {
    url: string;
  };
  name: string;
};

export type BlogPost = {
  sys: {
    id: string;
    spaceId: string;
    environmentId: string;
    publishedAt: string;
    firstPublishedAt: string;
    publishedVersion: number;
  };
  title: string;
  slug: string;
  tags: string[];
  description: string;
  heroImage: {
    url: string;
  };
  content: {
    json: Document;
  };
  date: string;
  author: {
    name: string;
    avatar: {
      url: string;
    };
  };
};

type PageHandle = {
  /** this just allows us to identify routes more directly rather than relying on pathnames */
  id?: string;
  /** this is here to allow us to disable scroll restoration until Remix gives us better control */
  restoreScroll?: boolean;
  getSitemapEntries?: (
    request: Request
  ) =>
    | Promise<Array<KCDSitemapEntry | null> | null>
    | Array<KCDSitemapEntry | null>
    | null;
};
