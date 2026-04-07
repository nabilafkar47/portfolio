"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { ImageUpload } from "@/components/ui/image-upload";
import type { Project } from "@/types/database";

type Props = {
  project?: Project;
  action: (formData: FormData) => Promise<{ error?: string; success?: boolean }>;
  title: string;
};

export function ProjectForm({ project, action, title }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState(project?.description ?? "");
  const [imageUrl, setImageUrl] = useState<string | null>(
    project?.image_url ?? null,
  );
  const [slug, setSlug] = useState(project?.slug ?? "");
  const isEditing = !!project;

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/[\s-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  async function handleSubmit(formData: FormData) {
    setError(null);
    setIsLoading(true);
    formData.set("description", description);
    formData.set("image_url", imageUrl ?? "");
    formData.set("slug", slug);
    const result = await action(formData);
    if (result?.error) {
      setError(result.error);
      toast.error(result.error);
      setIsLoading(false);
    } else {
      toast.success(
        isEditing
          ? "Project updated successfully"
          : "Project created successfully",
      );
      router.push("/dashboard/projects");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="flex flex-col gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              name="title"
              defaultValue={project?.title}
              required
              disabled={isLoading}
              onChange={(e) => setSlug(generateSlug(e.target.value))}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="slug">Slug *</Label>
            <Input
              id="slug"
              name="slug"
              value={slug}
              readOnly
              className="bg-muted cursor-not-allowed"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Input
              id="excerpt"
              name="excerpt"
              defaultValue={project?.excerpt ?? ""}
              disabled={isLoading}
            />
          </div>

          <div className="grid gap-2">
            <Label>Description</Label>
            <RichTextEditor
              content={description}
              onChange={setDescription}
              placeholder="Describe your project..."
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="tech_stack">Tech Stack (comma-separated)</Label>
            <Input
              id="tech_stack"
              name="tech_stack"
              defaultValue={project?.tech_stack?.join(", ") ?? ""}
              disabled={isLoading}
              placeholder="React, Next.js, Supabase"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="github_url">GitHub URL</Label>
              <Input
                id="github_url"
                name="github_url"
                defaultValue={project?.github_url ?? ""}
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="live_url">Live URL</Label>
              <Input
                id="live_url"
                name="live_url"
                defaultValue={project?.live_url ?? ""}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Project Image</Label>
            <ImageUpload
              bucket="images"
              folder="projects"
              value={imageUrl}
              onChange={setImageUrl}
            />
          </div>

          <div className="flex items-center gap-2">
            <Switch
              id="featured"
              name="featured"
              defaultChecked={project?.featured ?? false}
              disabled={isLoading}
            />
            <Label htmlFor="featured">Featured project</Label>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
