
"use client";

import type { CvMatchAndScoreOutput } from "@/ai/flows/cv-match-and-score";
import type { PersonalizedLearningRecommendationsOutput } from "@/ai/flows/personalized-learning-recommendations";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScoreDisplay } from "./score-display";
import { OptimizedCvSection } from "./optimized-cv-section";
import { SkillGapsAndRecommendations } from "./skill-gaps-and-recommendations";
import { LoadingSkeletons } from "./loading-skeletons";
import { AlertTriangle, Info } from "lucide-react";

export interface AppResults {
  cvMatchData: CvMatchAndScoreOutput | null;
  learningRecommendations: PersonalizedLearningRecommendationsOutput | null;
}

interface ResultsDisplayProps {
  results: AppResults | null;
  isLoading: boolean;
  error: string | null;
}

export function ResultsDisplay({ results, isLoading, error }: ResultsDisplayProps) {
  if (isLoading) {
    return <LoadingSkeletons />;
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mt-6">
        <AlertTriangle className="h-5 w-5" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!results || !results.cvMatchData) {
     return (
      <div className="mt-8 text-center p-8 border-2 border-dashed border-muted-foreground/30 rounded-lg bg-muted/10">
        <Info className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
        <h2 className="text-xl font-semibold text-foreground">Ready to Optimize?</h2>
        <p className="text-muted-foreground mt-2">
          Enter your CV and a job description above, then click "Match & Score" to see your results.
        </p>
      </div>
    );
  }

  const { cvMatchData, learningRecommendations } = results;

  return (
    <div className="space-y-8 mt-8 w-full">
      <ScoreDisplay
        originalScore={cvMatchData.originalCvScore}
        optimizedScore={cvMatchData.optimizedCvScore}
      />
      <OptimizedCvSection optimizedCv={cvMatchData.optimizedCv} />
      {learningRecommendations && (
        <SkillGapsAndRecommendations
          skillGaps={cvMatchData.skillGaps}
          learningRecommendations={learningRecommendations.learningRecommendations}
        />
      )}
    </div>
  );
}
