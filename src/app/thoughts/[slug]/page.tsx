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
  const { data: thought } = await supabase
    .from("thoughts")
    .select("title, excerpt")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!thought) return { title: "Thought Not Found" };

  return {
    title: `${thought.title} — Nabil Afkar`,
    description: thought.excerpt ?? undefined,
  };
}

export default async function ThoughtDetailPage({ params }: Props) {
  const { slug } = await params;
  const supabase = createPublicClient();
  const { data: thought } = await supabase
    .from("thoughts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!thought) notFound();

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
          <Link href="/thoughts">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>

        <article className="flex flex-col gap-6">
          <div>
            <span className="text-sm text-muted-foreground">
              {new Date(thought.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <h1 className="text-3xl font-semibold tracking-tight mt-2">
              {thought.title}
            </h1>
          </div>

          {thought.cover_image_url && (
            <div className="w-full max-w-2xl rounded-lg overflow-hidden border">
              <Image
                src={thought.cover_image_url}
                alt={thought.title}
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {thought.content && (
            <div
              className="prose prose-sm prose-neutral dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: thought.content }}
            />
          )}
        </article>
      </div>
      <Footer />
    </main>
  );
}
