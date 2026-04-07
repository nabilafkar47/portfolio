import Link from "next/link";
import type { Thought } from "@/types/database";

export function ThoughtsPage({ thoughts }: { thoughts: Thought[] }) {
  return (
    <div className="mx-auto max-w-5xl lg:border-x lg:border-dashed px-6 py-8">
      <h2 className="text-xl font-semibold tracking-tight">
        My random thoughts
      </h2>

      <div className="flex flex-col gap-12 mt-12">
        {thoughts.length === 0 && (
          <p className="text-sm text-muted-foreground">No thoughts yet.</p>
        )}
        {thoughts.map((item) => (
          <Link
            key={item.id}
            href={`/thoughts/${item.slug}`}
            className="flex flex-col group"
          >
            <span className="text-sm text-muted-foreground">
              {new Date(item.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <h3 className="text-lg font-semibold tracking-tight group-hover:underline">
              {item.title}
            </h3>
            {item.excerpt && (
              <p className="text-sm text-muted-foreground mt-1">
                {item.excerpt}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
