import { createPublicClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 3600;
import { Topbar } from "@/components/public/topbar";
import { Footer } from "@/components/public/footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = createPublicClient();
  const { data: project } = await supabase
    .from("projects")
    .select("title, excerpt")
    .eq("slug", slug)
    .single();

  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — Nabil Afkar`,
    description: project.excerpt ?? undefined,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const supabase = createPublicClient();
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!project) notFound();

  return (
    <main>
      <Topbar />
      <div className="mx-auto max-w-5xl lg:border-x lg:border-dashed px-6 sm:px-8 lg:px-10 py-8">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full mb-6"
          asChild
        >
          <Link href="/projects">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>

        <article className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              {project.title}
            </h1>
            {project.excerpt && (
              <p className="text-muted-foreground mt-2 tracking-tight">
                {project.excerpt}
              </p>
            )}
          </div>

          {project.image_url && (
            <div className="flex rounded-lg overflow-hidden justify-center">
              <Image
                src={project.image_url}
                alt={project.title}
                width={800}
                height={600}
                className="max-w-80 object-cover"
              />
            </div>
          )}

          {project.tech_stack && project.tech_stack.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tech_stack.map((tech: string) => (
                <span
                  key={tech}
                  className="text-xs px-2.5 py-1 rounded-md bg-secondary text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {project.description && (
            <div
              className="prose prose-sm prose-neutral dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: project.description }}
            />
          )}

          <div className="flex gap-3 mt-2">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm underline text-muted-foreground hover:text-foreground"
              >
                GitHub →
              </a>
            )}
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm underline text-muted-foreground hover:text-foreground"
              >
                Live Demo →
              </a>
            )}
          </div>
        </article>
      </div>
      <Footer />
    </main>
  );
}
