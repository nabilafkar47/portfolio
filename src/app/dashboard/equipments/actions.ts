"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { EquipmentInsert } from "@/types/database";

export async function createEquipment(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const data: EquipmentInsert = {
    name: formData.get("name") as string,
    category: formData.get("category") as "hardware" | "software" | "tools",
    description: formData.get("description") as string,
    icon_url: (formData.get("icon_url") as string) || null,
  };

  const { error } = await supabase.from("equipments").insert(data);
  if (error) return { error: error.message };

  revalidatePath("/dashboard/equipments");
  revalidatePath("/equipments");
  return { success: true };
}

export async function updateEquipment(id: string, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const data: Partial<EquipmentInsert> = {
    name: formData.get("name") as string,
    category: formData.get("category") as "hardware" | "software" | "tools",
    description: formData.get("description") as string,
    icon_url: (formData.get("icon_url") as string) || null,
  };

  const { error } = await supabase.from("equipments").update(data).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/dashboard/equipments");
  revalidatePath("/equipments");
  return { success: true };
}

export async function deleteEquipment(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };
  const { error } = await supabase.from("equipments").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/dashboard/equipments");
  revalidatePath("/equipments");
}
