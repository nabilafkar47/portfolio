// TypeScript types matching the Supabase database schema
// These types are manually defined to match CLAUDE.md schema exactly

export type Experience = {
  id: string;
  title: string;
  company: string;
  company_logo_url: string | null;
  location: string | null;
  description: string | null;
  start_date: string | null;
  end_date: string | null;
  is_current: boolean;
  created_at: string;
  updated_at: string;
};

export type ExperienceInsert = Omit<
  Experience,
  "id" | "created_at" | "updated_at"
> & {
  id?: string;
};

export type ExperienceUpdate = Partial<ExperienceInsert>;

export type Project = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  excerpt: string | null;
  tech_stack: string[] | null;
  github_url: string | null;
  live_url: string | null;
  image_url: string | null;
  featured: boolean;
  created_at: string;
  updated_at: string;
};

export type ProjectInsert = Omit<
  Project,
  "id" | "created_at" | "updated_at"
> & {
  id?: string;
};

export type ProjectUpdate = Partial<ProjectInsert>;

export type Thought = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_image_url: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type ThoughtInsert = Omit<
  Thought,
  "id" | "created_at" | "updated_at"
> & {
  id?: string;
};

export type ThoughtUpdate = Partial<ThoughtInsert>;

export type Equipment = {
  id: string;
  name: string;
  category: "hardware" | "software" | "tools";
  description: string;
  icon_url: string | null;
  created_at: string;
  updated_at: string;
};

export type EquipmentInsert = Omit<
  Equipment,
  "id" | "created_at" | "updated_at"
> & {
  id?: string;
};

export type EquipmentUpdate = Partial<EquipmentInsert>;
