"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { ThoughtInsert } from "@/types/database";

export async function createThought(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const data: ThoughtInsert = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    excerpt: (formData.get("excerpt") as string) || null,
    content: (formData.get("content") as string) || null,
    cover_image_url: (formData.get("cover_image_url") as string) || null,
    published: formData.get("published") === "on",
  };

  const { error } = await supabase.from("thoughts").insert(data);
  if (error) return { error: error.message };

  revalidatePath("/dashboard/thoughts");
  revalidatePath("/thoughts");
  revalidatePath("/thoughts/[slug]", "page");
  return { success: true };
}

export async function updateThought(id: string, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const data: Partial<ThoughtInsert> = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    excerpt: (formData.get("excerpt") as string) || null,
    content: (formData.get("content") as string) || null,
    cover_image_url: (formData.get("cover_image_url") as string) || null,
    published: formData.get("published") === "on",
  };

  const { error } = await supabase.from("thoughts").update(data).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/dashboard/thoughts");
  revalidatePath("/thoughts");
  revalidatePath("/thoughts/[slug]", "page");
  return { success: true };
}

export async function deleteThought(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };
  const { error } = await supabase.from("thoughts").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/dashboard/thoughts");
  revalidatePath("/thoughts");
  revalidatePath("/thoughts/[slug]", "page");
}
