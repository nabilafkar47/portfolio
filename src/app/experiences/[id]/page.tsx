import { createPublicClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 3600;
import { Topbar } from "@/components/public/topbar";
import { Footer } from "@/components/public/footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const supabase = createPublicClient();
  const { data: experience } = await supabase
    .from("experiences")
    .select("title, company")
    .eq("id", id)
    .single();

  if (!experience) return { title: "Experience Not Found" };

  return {
    title: `${experience.title} at ${experience.company} — Nabil Afkar`,
  };
}

export default async function ExperienceDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = createPublicClient();
  const { data: experience } = await supabase
    .from("experiences")
    .select("*")
    .eq("id", id)
    .single();

  if (!experience) notFound();

  const startDate = experience.start_date
    ? new Date(experience.start_date).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "";
  const endDate = experience.is_current
    ? "Present"
    : experience.end_date
      ? new Date(experience.end_date).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })
      : "";
  const dateRange = [startDate, endDate].filter(Boolean).join(" — ");

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
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>

        <article className="flex flex-col gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              {experience.title}
            </h1>
            <p className="text-muted-foreground tracking-tight mt-1">
              {experience.company}
              {experience.location && ` · ${experience.location}`}
            </p>
            {dateRange && (
              <p className="text-sm text-muted-foreground mt-1">{dateRange}</p>
            )}
          </div>

          {experience.description && (
            <div className="text-sm leading-relaxed tracking-tight whitespace-pre-wrap mt-4">
              {experience.description}
            </div>
          )}
        </article>
      </div>
      <Footer />
    </main>
  );
}
