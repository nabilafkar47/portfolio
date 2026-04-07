import { createPublicClient } from "@/lib/supabase/server";
import { ExperiencesPage } from "@/components/public/experiences/experiences-page";

export const revalidate = 3600;

export default async function Page() {
  const supabase = createPublicClient();
  const { data: experiences } = await supabase
    .from("experiences")
    .select("*")
    .order("is_current", { ascending: false })
    .order("end_date", { ascending: false, nullsFirst: true })
    .order("start_date", { ascending: false });

  return <ExperiencesPage experiences={experiences ?? []} />;
}
