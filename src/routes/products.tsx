import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Products } from "@/components/site/Products";
import { Industries } from "@/components/site/Industries";
import { Contact } from "@/components/site/Contact";
import { SITE_URL, absoluteUrl } from "@/lib/seo";
import project1Img from "@/assets/project-samples/project-1.webp";

const OG_IMAGE = absoluteUrl(project1Img);
const TITLE = "Produk Stainless Steel Custom Jabodetabek | Master Stainless";
const DESCRIPTION = "Produk stainless steel custom Master Stainless untuk pagar, railing, pintu, kitchen equipment, rumah sakit, restoran, laboratorium, pabrik, dan kebutuhan proyek di Jabodetabek.";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: `${SITE_URL}/products` },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:alt", content: "Produk stainless steel custom Master Stainless" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/products` }],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  return <><PageHeader eyebrow="Produk Stainless Steel" title="Produk Stainless Steel Custom untuk Rumah, Bisnis, dan Industri" subtitle="Pagar, railing, pintu, kitchen equipment, dan kebutuhan stainless steel custom berdasarkan ukuran, desain, fungsi, serta kondisi lokasi proyek." /><Products /><Industries /><Contact /></>;
}
