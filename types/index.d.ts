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
