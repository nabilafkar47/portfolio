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
import type { Thought } from "@/types/database";

type Props = {
  thought?: Thought;
  action: (formData: FormData) => Promise<{ error?: string; success?: boolean }>;
  title: string;
};

export function ThoughtForm({ thought, action, title }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState(thought?.content ?? "");
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(
    thought?.cover_image_url ?? null,
  );
  const [slug, setSlug] = useState(thought?.slug ?? "");
  const isEditing = !!thought;

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
    formData.set("content", content);
    formData.set("cover_image_url", coverImageUrl ?? "");
    formData.set("slug", slug);
    const result = await action(formData);
    if (result?.error) {
      setError(result.error);
      toast.error(result.error);
      setIsLoading(false);
    } else {
      toast.success(
        isEditing
          ? "Thought updated successfully"
          : "Thought created successfully",
      );
      router.push("/dashboard/thoughts");
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
              defaultValue={thought?.title}
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
              defaultValue={thought?.excerpt ?? ""}
              disabled={isLoading}
            />
          </div>

          <div className="grid gap-2">
            <Label>Content</Label>
            <RichTextEditor
              content={content}
              onChange={setContent}
              placeholder="Write your thoughts..."
            />
          </div>

          <div className="grid gap-2">
            <Label>Cover Image</Label>
            <ImageUpload
              bucket="images"
              folder="thoughts"
              value={coverImageUrl}
              onChange={setCoverImageUrl}
            />
          </div>

          <div className="flex items-center gap-2">
            <Switch
              id="published"
              name="published"
              defaultChecked={thought?.published ?? true}
              disabled={isLoading}
            />
            <Label htmlFor="published">Published</Label>
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
