import { createExperience } from "../actions";
import { ExperienceForm } from "../experience-form";

export default function NewExperiencePage() {
  return (
    <div className="max-w-2xl">
      <ExperienceForm
        title="Add Experience"
        action={createExperience}
      />
    </div>
  );
}
