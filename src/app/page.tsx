import { Hero } from "@/components/hero/Hero";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllProjects } from "@/lib/projects";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";

export default function Home() {
  const projects = getAllProjects();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: SITE_NAME,
          description: SITE_DESCRIPTION,
          url: SITE_URL,
          publisher: {
            "@type": "Organization",
            name: "RunPod Labs",
            url: SITE_URL,
          },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: projects.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${SITE_URL}/projects/${p.id}`,
              name: p.title,
              description: p.tagline,
            })),
          },
        }}
      />

      <Hero />

      <div className="mx-auto max-w-[1400px] px-6 md:px-10 pb-20 -mt-4">
        <ProjectGrid projects={projects} />
      </div>
    </>
  );
}
