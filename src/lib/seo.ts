export const SITE_URL = "https://masterstainless.online";

/** Ubah path aset lokal menjadi URL absolut untuk SEO/social cards. */
export function absoluteUrl(pathOrUrl: string) {
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}
