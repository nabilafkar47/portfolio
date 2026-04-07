import type { Equipment } from "@/types/database";

const categoryLabels: Record<Equipment["category"], string> = {
  hardware: "Hardware",
  software: "Software",
  tools: "Tools",
};

export function EquipmentsPage({ equipments }: { equipments: Equipment[] }) {
  const grouped = equipments.reduce(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, Equipment[]>,
  );

  const categories = ["hardware", "software", "tools"] as const;

  return (
    <div className="mx-auto max-w-5xl lg:border-x lg:border-dashed px-6 py-8">
      <h2 className="text-xl font-semibold tracking-tight">
        Tools &amp; equipment I use
      </h2>

      <div className="flex flex-col gap-12 mt-12">
        {equipments.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No equipments listed yet.
          </p>
        )}
        {categories.map((category) => {
          const items = grouped[category];
          if (!items || items.length === 0) return null;

          return (
            <div key={category} className="flex flex-col gap-6">
              <h3 className="text-lg font-semibold tracking-tight">
                {categoryLabels[category]}
              </h3>
              <div className="flex flex-col gap-4">
                {items.map((item) => (
                  <div key={item.id} className="flex flex-col">
                    <span className="font-medium tracking-tight">
                      {item.name}
                    </span>
                    <p className="text-sm text-muted-foreground tracking-tight">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
