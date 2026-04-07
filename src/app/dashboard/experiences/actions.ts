"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { ExperienceInsert } from "@/types/database";

export async function createExperience(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const data: ExperienceInsert = {
    title: formData.get("title") as string,
    company: formData.get("company") as string,
    company_logo_url: (formData.get("company_logo_url") as string) || null,
    location: (formData.get("location") as string) || null,
    description: (formData.get("description") as string) || null,
    start_date: (formData.get("start_date") as string) || null,
    end_date: (formData.get("end_date") as string) || null,
    is_current: formData.get("is_current") === "on",
  };

  const { error } = await supabase.from("experiences").insert(data);
  if (error) return { error: error.message };

  revalidatePath("/dashboard/experiences");
  revalidatePath("/");
  revalidatePath("/experiences/[id]", "page");
  return { success: true };
}

export async function updateExperience(id: string, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const data: Partial<ExperienceInsert> = {
    title: formData.get("title") as string,
    company: formData.get("company") as string,
    company_logo_url: (formData.get("company_logo_url") as string) || null,
    location: (formData.get("location") as string) || null,
    description: (formData.get("description") as string) || null,
    start_date: (formData.get("start_date") as string) || null,
    end_date: (formData.get("end_date") as string) || null,
    is_current: formData.get("is_current") === "on",
  };

  const { error } = await supabase
    .from("experiences")
    .update(data)
    .eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/dashboard/experiences");
  revalidatePath("/");
  revalidatePath("/experiences/[id]", "page");
  return { success: true };
}

export async function deleteExperience(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };
  const { error } = await supabase.from("experiences").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/dashboard/experiences");
  revalidatePath("/");
  revalidatePath("/experiences/[id]", "page");
}
