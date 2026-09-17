import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Projects } from "@/components/site/Projects";
import { Testimonials } from "@/components/site/Testimonials";
import { SITE_URL, absoluteUrl } from "@/lib/seo";
import { PROJECTS } from "@/lib/site-data";

const OG_IMAGE = absoluteUrl(PROJECTS[0].image);
const TITLE = "Portofolio Proyek Stainless Steel Jabodetabek | Master Stainless";
const DESCRIPTION = "Lihat portofolio fabrikasi stainless steel Master Stainless untuk rumah, restoran, hotel, rumah sakit, pabrik, gudang, dan proyek komersial di Jabodetabek.";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: `${SITE_URL}/projects` },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:alt", content: `Portofolio proyek stainless steel ${PROJECTS[0].title} oleh Master Stainless` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/projects` }],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return <><PageHeader eyebrow="Portofolio Fabrikasi" title="Proyek Stainless Steel yang Kami Kerjakan" subtitle="Contoh pekerjaan fabrikasi stainless steel custom untuk hunian, restoran, hotel, fasilitas kesehatan, pabrik, gudang, dan proyek komersial di Jabodetabek." /><Projects /><Testimonials /></>;
}
