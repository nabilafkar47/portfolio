import { HeroSection } from "@/components/public/hero-section";
import { ContentNavigation } from "@/components/public/content-navigation";
import { Topbar } from "@/components/public/topbar";
import { Footer } from "@/components/public/footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Topbar />
      <HeroSection />
      <ContentNavigation />
      {children}
      <Footer />
    </main>
  );
}
