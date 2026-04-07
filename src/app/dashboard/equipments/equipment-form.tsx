"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ImageUpload } from "@/components/ui/image-upload";
import type { Equipment } from "@/types/database";

type Props = {
  equipment?: Equipment;
  action: (formData: FormData) => Promise<{ error?: string; success?: boolean }>;
  title: string;
};

export function EquipmentForm({ equipment, action, title }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState<string>(equipment?.category ?? "hardware");
  const [iconUrl, setIconUrl] = useState<string | null>(
    equipment?.icon_url ?? null,
  );
  const isEditing = !!equipment;

  async function handleSubmit(formData: FormData) {
    setError(null);
    setIsLoading(true);
    formData.set("category", category);
    formData.set("icon_url", iconUrl ?? "");
    const result = await action(formData);
    if (result?.error) {
      setError(result.error);
      toast.error(result.error);
      setIsLoading(false);
    } else {
      toast.success(isEditing ? "Equipment updated successfully" : "Equipment created successfully");
      router.push("/dashboard/equipments");
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
            <Label htmlFor="name">Name *</Label>
            <Input id="name" name="name" defaultValue={equipment?.name} required disabled={isLoading} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="category">Category *</Label>
            <Select value={category} onValueChange={setCategory} disabled={isLoading}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hardware">Hardware</SelectItem>
                <SelectItem value="software">Software</SelectItem>
                <SelectItem value="tools">Tools</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea id="description" name="description" defaultValue={equipment?.description ?? ""}
              rows={4} required disabled={isLoading} />
          </div>

          <div className="grid gap-2">
            <Label>Icon</Label>
            <ImageUpload
              bucket="images"
              folder="icons"
              value={iconUrl}
              onChange={setIconUrl}
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : "Save"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
