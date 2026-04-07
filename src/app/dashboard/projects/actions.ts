"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { ProjectInsert } from "@/types/database";

export async function createProject(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const techStackRaw = formData.get("tech_stack") as string;
  const tech_stack = techStackRaw
    ? techStackRaw.split(",").map((t) => t.trim()).filter(Boolean)
    : null;

  const data: ProjectInsert = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    description: (formData.get("description") as string) || null,
    excerpt: (formData.get("excerpt") as string) || null,
    tech_stack,
    github_url: (formData.get("github_url") as string) || null,
    live_url: (formData.get("live_url") as string) || null,
    image_url: (formData.get("image_url") as string) || null,
    featured: formData.get("featured") === "on",
  };

  const { error } = await supabase.from("projects").insert(data);
  if (error) return { error: error.message };

  revalidatePath("/dashboard/projects");
  revalidatePath("/projects");
  revalidatePath("/projects/[slug]", "page");
  return { success: true };
}

export async function updateProject(id: string, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const techStackRaw = formData.get("tech_stack") as string;
  const tech_stack = techStackRaw
    ? techStackRaw.split(",").map((t) => t.trim()).filter(Boolean)
    : null;

  const data: Partial<ProjectInsert> = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    description: (formData.get("description") as string) || null,
    excerpt: (formData.get("excerpt") as string) || null,
    tech_stack,
    github_url: (formData.get("github_url") as string) || null,
    live_url: (formData.get("live_url") as string) || null,
    image_url: (formData.get("image_url") as string) || null,
    featured: formData.get("featured") === "on",
  };

  const { error } = await supabase.from("projects").update(data).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/dashboard/projects");
  revalidatePath("/projects");
  revalidatePath("/projects/[slug]", "page");
  return { success: true };
}

export async function deleteProject(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/dashboard/projects");
  revalidatePath("/projects");
  revalidatePath("/projects/[slug]", "page");
}
