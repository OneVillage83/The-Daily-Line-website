export type SportStatus = "building" | "live" | "offseason";

export type DailySport = {
  slug: "mlb" | "nfl" | "ncaaf";
  productName: string;
  leagueName: string;
  shortName: string;
  description: string;
  status: SportStatus;
  accent: string;
};

export const DAILY_SPORTS: readonly DailySport[] = [
  {
    slug: "mlb",
    productName: "Daily-MLB",
    leagueName: "Major League Baseball",
    shortName: "MLB",
    description: "Every-game baseball modeling, market context, matchup research, and transparent recommendation gates.",
    status: "building",
    accent: "diamond",
  },
  {
    slug: "nfl",
    productName: "Daily-NFL",
    leagueName: "National Football League",
    shortName: "NFL",
    description: "Game-level football forecasts built around point-in-time information, market state, injuries, weather, and matchup structure.",
    status: "building",
    accent: "gridiron",
  },
  {
    slug: "ncaaf",
    productName: "Daily-NCAAF",
    leagueName: "College Football",
    shortName: "NCAAF",
    description: "A college-football publication system designed for the scale, uncertainty, roster movement, and market structure of the sport.",
    status: "building",
    accent: "campus",
  },
] as const;

export function getSportBySlug(slug: string): DailySport | undefined {
  return DAILY_SPORTS.find((sport) => sport.slug === slug);
}
