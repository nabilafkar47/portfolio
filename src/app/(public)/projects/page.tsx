import { createPublicClient } from "@/lib/supabase/server";
import { ProjectsPage } from "@/components/public/projects/projects-page";

export const revalidate = 3600;

export default async function ProjectsRoute() {
  const supabase = createPublicClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  return <ProjectsPage projects={projects ?? []} />;
}
