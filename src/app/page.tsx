import { AppHeader } from "@/components/layout/app-header";
import { CvOptimizerPage } from "@/components/cv-optimizer/cv-optimizer-page";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />
      <main className="flex-grow container mx-auto max-w-5xl">
        <CvOptimizerPage />
      </main>
      <footer className="py-4 text-center text-sm text-muted-foreground border-t">
        CV Optimizer with Genkit AIS
      </footer>
    </div>
  );
}
