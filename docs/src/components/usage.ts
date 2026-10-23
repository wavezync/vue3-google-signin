// Usage data for the home page's Used by charts, fetched at build time:
// monthly npm downloads (both packages), the star count, and the star
// history. GitHub only lists stargazers to authenticated requests, so the
// history is fetched only when the build has a GITHUB_TOKEN (a read-only
// token is enough); without one it comes from the snapshot below. Any failed
// request also falls back to the snapshot, so a deploy never breaks because
// npm or GitHub is slow.

export type MonthlyDownloads = [month: string, core: number, nuxt: number];

export interface Usage {
  /** The last 12 full months, oldest first */
  downloads: MonthlyDownloads[];
  /** Stars right now */
  starCount: number;
  /** Cumulative stars at the end of each month since the first star */
  stars: number[];
  /** First month of `stars`, as YYYY-MM */
  starsFrom: string;
}

const REPO = "wavezync/vue3-google-signin";
const PACKAGES = ["vue3-google-signin", "nuxt-vue3-google-signin"] as const;
const TIMEOUT = 8000;

// Fetched by hand in October 2026; used when a request fails, and for the
// star history when there's no GITHUB_TOKEN
const SNAPSHOT: Usage = {
  downloads: [
    ["2025-10", 35623, 19646],
    ["2025-11", 32936, 18368],
    ["2025-12", 33449, 18513],
    ["2026-01", 32302, 15997],
    ["2026-02", 34308, 15933],
    ["2026-03", 43416, 21373],
    ["2026-04", 42250, 19453],
    ["2026-05", 37113, 18208],
    ["2026-06", 36989, 18315],
    ["2026-07", 36154, 16627],
    ["2026-08", 34732, 16779],
    ["2026-09", 39443, 18424],
  ],
  stars: [
    29, 39, 43, 45, 50, 51, 61, 65, 73, 78, 79, 82, 86, 88, 93, 100, 103, 107,
    113, 117, 125, 127, 131, 132, 139, 144, 149, 154, 158, 161, 165, 167, 168,
    173, 173, 175, 176, 176, 179, 181, 184, 185, 185, 185, 185, 186, 186, 187,
    187, 187, 187, 187,
  ],
  starsFrom: "2022-07",
  starCount: 187,
};

const monthKey = (date: Date) => date.toISOString().slice(0, 7);
const dayKey = (date: Date) => date.toISOString().slice(0, 10);

const getJson = async (url: string, headers: Record<string, string> = {}) => {
  const response = await fetch(url, {
    headers,
    signal: AbortSignal.timeout(TIMEOUT),
  });
  if (!response.ok) throw new Error(`${response.status} from ${url}`);
  return response.json();
};

async function fetchDownloads(now: Date): Promise<MonthlyDownloads[]> {
  // The 12 full months before the current one
  const start = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 12, 1),
  );
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 0));
  const range = `${dayKey(start)}:${dayKey(end)}`;
  const [core, nuxt] = await Promise.all(
    PACKAGES.map(async (name) => {
      const data = await getJson(
        `https://api.npmjs.org/downloads/range/${range}/${name}`,
      );
      const byMonth = new Map<string, number>();
      for (const { day, downloads } of data.downloads as {
        day: string;
        downloads: number;
      }[]) {
        const month = day.slice(0, 7);
        byMonth.set(month, (byMonth.get(month) ?? 0) + downloads);
      }
      return byMonth;
    }),
  );
  const months = [...core.keys()];
  if (months.length !== 12)
    throw new Error(`expected 12 months, got ${months.length}`);
  return months.map((month) => [month, core.get(month)!, nuxt.get(month) ?? 0]);
}

const githubHeaders = (accept: string) => {
  const headers: Record<string, string> = {
    Accept: accept,
    "User-Agent": "vue3-google-signin-docs",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
};

async function fetchStarCount(): Promise<number> {
  const repo = await getJson(
    `https://api.github.com/repos/${REPO}`,
    githubHeaders("application/vnd.github+json"),
  );
  return repo.stargazers_count;
}

async function fetchStarHistory(
  now: Date,
): Promise<Pick<Usage, "stars" | "starsFrom">> {
  if (!process.env.GITHUB_TOKEN) {
    throw new Error("listing stargazers needs a GITHUB_TOKEN");
  }
  const headers = githubHeaders("application/vnd.github.star+json");
  const dates: string[] = [];
  // ponytail: 100 per page, capped at 30 pages (3,000 stars); raise the cap
  // if the repo outgrows it
  for (let page = 1; page <= 30; page++) {
    const batch = (await getJson(
      `https://api.github.com/repos/${REPO}/stargazers?per_page=100&page=${page}`,
      headers,
    )) as { starred_at: string }[];
    dates.push(...batch.map((star) => star.starred_at));
    if (batch.length < 100) break;
  }
  if (!dates.length) throw new Error("no stargazers returned");

  const perMonth = new Map<string, number>();
  for (const date of dates) {
    perMonth.set(date.slice(0, 7), (perMonth.get(date.slice(0, 7)) ?? 0) + 1);
  }
  const starsFrom = [...perMonth.keys()].sort()[0];
  const stars: number[] = [];
  let total = 0;
  for (
    let month = new Date(`${starsFrom}-01T00:00:00Z`);
    monthKey(month) <= monthKey(now);
    month.setUTCMonth(month.getUTCMonth() + 1)
  ) {
    total += perMonth.get(monthKey(month)) ?? 0;
    stars.push(total);
  }
  return { stars, starsFrom };
}

const withFallback = async <T>(
  what: string,
  load: () => Promise<T>,
  fallback: T,
) => {
  try {
    return await load();
  } catch (error) {
    console.warn(`[usage] ${what} unavailable, using the snapshot: ${error}`);
    return fallback;
  }
};

let cached: Promise<Usage> | undefined;

/** Fetched once per build (or dev server run) */
export const getUsage = (): Promise<Usage> =>
  (cached ??= (async () => {
    const now = new Date();
    const [downloads, starCount, starHistory] = await Promise.all([
      withFallback(
        "npm downloads",
        () => fetchDownloads(now),
        SNAPSHOT.downloads,
      ),
      withFallback("GitHub star count", fetchStarCount, SNAPSHOT.starCount),
      withFallback("GitHub star history", () => fetchStarHistory(now), {
        stars: SNAPSHOT.stars,
        starsFrom: SNAPSHOT.starsFrom,
      }),
    ]);
    return { downloads, starCount, ...starHistory };
  })());
