import { createThought } from "../actions";
import { ThoughtForm } from "../thought-form";

export default function NewThoughtPage() {
  return (
    <div className="max-w-2xl">
      <ThoughtForm title="Add Thought" action={createThought} />
    </div>
  );
}
