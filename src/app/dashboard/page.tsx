import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SquareChartGantt, Package2, BookOpen, Wrench } from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();

  const [
    { count: expCount },
    { count: projCount },
    { count: thoughtCount },
    { count: equipCount },
    { data: recentExperiences },
    { data: recentProjects },
    { data: recentThoughts },
  ] = await Promise.all([
    supabase.from("experiences").select("*", { count: "exact", head: true }),
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("thoughts").select("*", { count: "exact", head: true }),
    supabase.from("equipments").select("*", { count: "exact", head: true }),
    supabase.from("experiences").select("title, company").order("created_at", { ascending: false }).limit(3),
    supabase.from("projects").select("title, slug").order("created_at", { ascending: false }).limit(3),
    supabase.from("thoughts").select("title, slug, published").order("created_at", { ascending: false }).limit(3),
  ]);

  const stats = [
    { label: "Experiences", count: expCount ?? 0, icon: SquareChartGantt },
    { label: "Projects", count: projCount ?? 0, icon: Package2 },
    { label: "Thoughts", count: thoughtCount ?? 0, icon: BookOpen },
    { label: "Equipments", count: equipCount ?? 0, icon: Wrench },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome back 👋
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Here&apos;s an overview of your portfolio content.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.count}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Items */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Recent Experiences
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {recentExperiences?.length === 0 && (
              <p className="text-sm text-muted-foreground">None yet</p>
            )}
            {recentExperiences?.map((exp) => (
              <div key={exp.title} className="text-sm">
                <span className="font-medium">{exp.title}</span>
                <span className="text-muted-foreground"> at {exp.company}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Recent Projects
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {recentProjects?.length === 0 && (
              <p className="text-sm text-muted-foreground">None yet</p>
            )}
            {recentProjects?.map((proj) => (
              <div key={proj.slug} className="text-sm font-medium">
                {proj.title}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Recent Thoughts
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {recentThoughts?.length === 0 && (
              <p className="text-sm text-muted-foreground">None yet</p>
            )}
            {recentThoughts?.map((t) => (
              <div key={t.slug} className="text-sm">
                <span className="font-medium">{t.title}</span>
                {!t.published && (
                  <span className="text-xs text-muted-foreground ml-2">(Draft)</span>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
