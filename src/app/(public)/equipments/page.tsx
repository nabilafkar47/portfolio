import { createPublicClient } from "@/lib/supabase/server";
import { EquipmentsPage } from "@/components/public/equipments/equipments-page";

export const revalidate = 3600;

export default async function EquipmentsRoute() {
  const supabase = createPublicClient();
  const { data: equipments } = await supabase
    .from("equipments")
    .select("*")
    .order("category", { ascending: true });

  return <EquipmentsPage equipments={equipments ?? []} />;
}
