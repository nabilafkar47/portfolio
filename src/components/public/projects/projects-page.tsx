import Image from "next/image";
import Link from "next/link";
import { Badge } from "../../ui/badge";
import type { Project } from "@/types/database";

export function ProjectsPage({ projects }: { projects: Project[] }) {
  return (
    <div className="mx-auto max-w-5xl lg:border-x lg:border-dashed px-6 py-8">
      <h2 className="text-xl font-semibold tracking-tight">
        Some app I&apos;ve build
      </h2>
      <div className="flex flex-col gap-12 mt-12">
        {projects.length === 0 && (
          <p className="text-sm text-muted-foreground">No projects yet.</p>
        )}
        {projects.map((item) => (
          <Link
            key={item.id}
            href={`/projects/${item.slug}`}
            className="flex flex-col-reverse sm:flex-row gap-6 sm:gap-0 items-start sm:items-center justify-between group"
          >
            <div className="flex flex-col w-full sm:w-auto">
              <h3 className="text-lg font-semibold tracking-tight group-hover:underline">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {item.excerpt ?? item.description}
              </p>

              {item.tech_stack && item.tech_stack.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-4">
                  {item.tech_stack.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="text-muted-foreground"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {item.image_url && (
              <div className="relative w-full max-w-60 aspect-square self-center sm:self-auto shrink-0">
                <Image
                  src={item.image_url}
                  alt={item.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 100vw, 240px"
                />
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
