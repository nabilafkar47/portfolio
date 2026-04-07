import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { updateExperience } from "../../actions";
import { ExperienceForm } from "../../experience-form";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditExperiencePage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: experience } = await supabase
    .from("experiences")
    .select("*")
    .eq("id", id)
    .single();

  if (!experience) notFound();

  const updateWithId = async (formData: FormData) => {
    "use server";
    return updateExperience(id, formData);
  };

  return (
    <div className="max-w-2xl">
      <ExperienceForm
        title="Edit Experience"
        experience={experience}
        action={updateWithId}
      />
    </div>
  );
}
