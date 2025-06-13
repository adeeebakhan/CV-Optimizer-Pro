
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SimulateAssignmentDialog } from "./simulate-assignment-dialog";
import { Lightbulb, GraduationCap, ListChecks, PlayCircle } from "lucide-react";

interface SkillGapsAndRecommendationsProps {
  skillGaps: string; // This is a single string, potentially with newlines
  learningRecommendations: string[];
}

export function SkillGapsAndRecommendations({ skillGaps, learningRecommendations }: SkillGapsAndRecommendationsProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentAssignment, setCurrentAssignment] = useState("");

  const handleSimulateSubmission = (recommendation: string) => {
    setCurrentAssignment(recommendation);
    setIsDialogOpen(true);
  };

  // Split skillGaps string into an array if it contains newlines or bullet points
  const formattedSkillGaps = skillGaps.split(/\n|\• /).map(s => s.trim()).filter(s => s.length > 0);

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-headline">
          <Lightbulb className="h-6 w-6 text-primary" />
          Your Development Path
        </CardTitle>
        <CardDescription>
          Discover skill gaps and personalized learning steps to bridge them.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-foreground">
            <ListChecks className="h-5 w-5 text-accent" />
            Identified Skill Gaps
          </h3>
          {formattedSkillGaps.length > 0 ? (
            <ul className="list-disc list-inside space-y-1 pl-2 text-muted-foreground">
              {formattedSkillGaps.map((gap, index) => (
                <li key={index} className="text-sm">{gap}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No specific skill gaps identified, or they are integrated into the recommendations.</p>
          )}
          {formattedSkillGaps.length === 0 && skillGaps.length > 0 && (
             <p className="text-sm text-muted-foreground mt-2 whitespace-pre-line">{skillGaps}</p>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-foreground">
            <GraduationCap className="h-5 w-5 text-accent" />
            Personalized Learning Recommendations
          </h3>
          {learningRecommendations.length > 0 ? (
            <ul className="space-y-3">
              {learningRecommendations.map((rec, index) => (
                <li key={index} className="p-3 border rounded-md bg-background shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-sm mb-2 text-foreground">{rec}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSimulateSubmission(rec)}
                    className="border-accent text-accent hover:bg-accent/10"
                    aria-label={`Simulate submission for: ${rec}`}
                  >
                    <PlayCircle className="mr-2 h-4 w-4" />
                    Simulate Assignment Submission
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No specific learning recommendations generated at this time.</p>
          )}
        </div>
      </CardContent>
      <SimulateAssignmentDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        assignmentTitle={currentAssignment}
      />
    </Card>
  );
}
