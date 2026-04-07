import { createPublicClient } from "@/lib/supabase/server";
import { ThoughtsPage } from "@/components/public/thoughts/thoughts-page";

export const revalidate = 3600;

export default async function ThoughtsRoute() {
  const supabase = createPublicClient();
  const { data: thoughts } = await supabase
    .from("thoughts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return <ThoughtsPage thoughts={thoughts ?? []} />;
}
