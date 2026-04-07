import { createProject } from "../actions";
import { ProjectForm } from "../project-form";

export default function NewProjectPage() {
  return (
    <div className="max-w-2xl">
      <ProjectForm title="Add Project" action={createProject} />
    </div>
  );
}
