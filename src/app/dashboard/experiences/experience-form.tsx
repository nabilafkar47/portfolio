"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ImageUpload } from "@/components/ui/image-upload";
import type { Experience } from "@/types/database";

type Props = {
  experience?: Experience;
  action: (formData: FormData) => Promise<{ error?: string; success?: boolean }>;
  title: string;
};

export function ExperienceForm({ experience, action, title }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(
    experience?.company_logo_url ?? null,
  );
  const isEditing = !!experience;

  async function handleSubmit(formData: FormData) {
    setError(null);
    setIsLoading(true);
    formData.set("company_logo_url", logoUrl ?? "");
    const result = await action(formData);
    if (result?.error) {
      setError(result.error);
      toast.error(result.error);
      setIsLoading(false);
    } else {
      toast.success(isEditing ? "Experience updated successfully" : "Experience created successfully");
      router.push("/dashboard/experiences");
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
              defaultValue={experience?.title}
              required
              disabled={isLoading}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="company">Company *</Label>
            <Input
              id="company"
              name="company"
              defaultValue={experience?.company}
              required
              disabled={isLoading}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              defaultValue={experience?.location ?? ""}
              disabled={isLoading}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={experience?.description ?? ""}
              rows={4}
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="start_date">Start Date</Label>
              <Input
                id="start_date"
                name="start_date"
                type="date"
                defaultValue={experience?.start_date ?? ""}
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="end_date">End Date</Label>
              <Input
                id="end_date"
                name="end_date"
                type="date"
                defaultValue={experience?.end_date ?? ""}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Switch
              id="is_current"
              name="is_current"
              defaultChecked={experience?.is_current ?? false}
              disabled={isLoading}
            />
            <Label htmlFor="is_current">Currently working here</Label>
          </div>

          <div className="grid gap-2">
            <Label>Company Logo</Label>
            <ImageUpload
              bucket="images"
              folder="logos"
              value={logoUrl}
              onChange={setLogoUrl}
            />
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

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
