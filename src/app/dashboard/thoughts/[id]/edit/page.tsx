import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { updateThought } from "../../actions";
import { ThoughtForm } from "../../thought-form";

type Props = { params: Promise<{ id: string }> };

export default async function EditThoughtPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: thought } = await supabase.from("thoughts").select("*").eq("id", id).single();
  if (!thought) notFound();

  const updateWithId = async (formData: FormData) => {
    "use server";
    return updateThought(id, formData);
  };

  return (
    <div className="max-w-2xl">
      <ThoughtForm title="Edit Thought" thought={thought} action={updateWithId} />
    </div>
  );
}
