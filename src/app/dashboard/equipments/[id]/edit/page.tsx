import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { updateEquipment } from "../../actions";
import { EquipmentForm } from "../../equipment-form";

type Props = { params: Promise<{ id: string }> };

export default async function EditEquipmentPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: equipment } = await supabase.from("equipments").select("*").eq("id", id).single();
  if (!equipment) notFound();

  const updateWithId = async (formData: FormData) => {
    "use server";
    return updateEquipment(id, formData);
  };

  return (
    <div className="max-w-2xl">
      <EquipmentForm title="Edit Equipment" equipment={equipment} action={updateWithId} />
    </div>
  );
}
