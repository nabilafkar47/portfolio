import type { Experience } from "@/types/database";

export function ExperiencesPage({
  experiences,
}: {
  experiences: Experience[];
}) {
  return (
    <div className="mx-auto max-w-5xl lg:border-x lg:border-dashed px-6 py-8">
      <h2 className="text-xl font-semibold tracking-tight">
        What I&apos;ve been through
      </h2>
      <div className="flex flex-col gap-12 mt-12">
        {experiences.length === 0 && (
          <p className="text-sm text-muted-foreground">No experiences yet.</p>
        )}
        {experiences.map((item) => {
          const startDate = item.start_date
            ? new Date(item.start_date).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })
            : "";
          const endDate = item.is_current
            ? "Present"
            : item.end_date
              ? new Date(item.end_date).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })
              : "";
          const dateRange = [startDate, endDate].filter(Boolean).join(" - ");

          return (
            <div
              key={item.id}
              className="grid sm:grid-cols-[200px_1fr_150px] gap-4"
            >
              <span className="text-sm tracking-tight">{item.company}</span>
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground tracking-tight">
                  {item.description}
                </p>
              </div>
              <span className="text-sm tracking-tight">{dateRange}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
