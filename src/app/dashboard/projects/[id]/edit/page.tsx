import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { updateProject } from "../../actions";
import { ProjectForm } from "../../project-form";

type Props = { params: Promise<{ id: string }> };

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: project } = await supabase.from("projects").select("*").eq("id", id).single();
  if (!project) notFound();

  const updateWithId = async (formData: FormData) => {
    "use server";
    return updateProject(id, formData);
  };

  return (
    <div className="max-w-2xl">
      <ProjectForm title="Edit Project" project={project} action={updateWithId} />
    </div>
  );
}
