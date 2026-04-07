import { Gauge, SquareChartGantt, Book, Package2, Wrench } from "lucide-react";

export const dashboardNav = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Gauge,
  },
  {
    title: "Experiences",
    url: "/dashboard/experiences",
    icon: SquareChartGantt,
  },
  {
    title: "Projects",
    url: "/dashboard/projects",
    icon: Package2,
  },
  {
    title: "Thoughts",
    url: "/dashboard/thoughts",
    icon: Book,
  },
  {
    title: "Equipments",
    url: "/dashboard/equipments",
    icon: Wrench,
  },
];

