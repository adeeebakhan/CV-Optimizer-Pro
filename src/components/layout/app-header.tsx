
import { Briefcase } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="py-6 px-4 sm:px-6 lg:px-8 border-b">
      <div className="max-w-5xl mx-auto flex items-center gap-3">
        <Briefcase className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-headline font-semibold text-foreground">
          CV Optimizer Pro
        </h1>
      </div>
    </header>
  );
}
