import { createEquipment } from "../actions";
import { EquipmentForm } from "../equipment-form";

export default function NewEquipmentPage() {
  return (
    <div className="max-w-2xl">
      <EquipmentForm title="Add Equipment" action={createEquipment} />
    </div>
  );
}
