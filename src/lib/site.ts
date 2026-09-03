import type { Metadata } from "next";

export const SITE = {
  name: "The Daily Line",
  tagline: "See the data. Find the edge.",
  description:
    "Data-driven sports predictions, matchup research, market context, and transparent performance tracking.",
} as const;

export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  try {
    return new URL(configured);
  } catch {
    return new URL("http://localhost:3000");
  }
}

type PageMetadataInput = {
  title: string;
  description: string;
  path: `/${string}` | "/";
  index?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  index = true,
}: PageMetadataInput): Metadata {
  const canonical = new URL(path, getSiteUrl()).toString();

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      title,
      description,
      url: canonical,
    },
    robots: index
      ? undefined
      : {
          index: false,
          follow: true,
        },
  };
}
