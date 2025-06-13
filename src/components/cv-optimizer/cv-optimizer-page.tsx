
"use client";

import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { cvMatchAndScore, type CvMatchAndScoreOutput } from "@/ai/flows/cv-match-and-score";
import { personalizedLearningRecommendations, type PersonalizedLearningRecommendationsOutput } from "@/ai/flows/personalized-learning-recommendations";
import { CvInputForm, type CvInputFormValues } from "./cv-input-form"; // Updated import type
import { ResultsDisplay, type AppResults } from "./results-display";
import { useToast } from "@/hooks/use-toast";

export function CvOptimizerPage() {
  const [results, setResults] = useState<AppResults | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit: SubmitHandler<CvInputFormValues> = async (data) => {
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      // Read the uploaded CV file content
      const cvTextContent = await data.cvFile.text();

      const cvMatchResult: CvMatchAndScoreOutput = await cvMatchAndScore({
        cvText: cvTextContent, // Use file content
        jobDescriptionText: data.jobDescriptionText,
      });

      let learningRecsResult: PersonalizedLearningRecommendationsOutput | null = null;
      if (cvMatchResult.skillGaps) {
         learningRecsResult = await personalizedLearningRecommendations({
          cvText: cvTextContent, // Use file content
          jobDescriptionText: data.jobDescriptionText,
          skillGaps: cvMatchResult.skillGaps,
        });
      }
      
      setResults({
        cvMatchData: cvMatchResult,
        learningRecommendations: learningRecsResult,
      });

      toast({
        title: "Analysis Complete!",
        description: "Your CV insights are ready.",
        variant: "default",
      });

    } catch (e) {
      console.error("AI processing error or file reading error:", e);
      let errorMessage = "An unknown error occurred.";
      if (e instanceof Error) {
        errorMessage = e.message;
      } else if (typeof e === 'string') {
        errorMessage = e;
      }
      
      // Specific error for file reading issues if not already an Error object.
      if (!(e instanceof Error) && data.cvFile && typeof data.cvFile.text !== 'function') {
        errorMessage = "Could not read the CV file. Please ensure it's a valid .txt file.";
      }


      setError(errorMessage);
      toast({
        title: "Analysis Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <CvInputForm onSubmit={handleSubmit} isLoading={isLoading} />
      <ResultsDisplay results={results} isLoading={isLoading} error={error} />
    </div>
  );
}
