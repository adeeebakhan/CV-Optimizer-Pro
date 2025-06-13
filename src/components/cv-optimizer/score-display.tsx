
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Gauge } from "lucide-react";

interface ScoreDisplayProps {
  originalScore: number;
  optimizedScore: number;
}

function ScoreCard({ title, score, icon: Icon, colorClass }: { title: string, score: number, icon: React.ElementType, colorClass: string }) {
  return (
    <Card className="flex-1 min-w-[200px] shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Icon className={`h-5 w-5 ${colorClass === 'text-primary' ? 'text-primary' : 'text-accent'}`} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold text-foreground">{score}<span className="text-xl text-muted-foreground">/100</span></div>
        <Progress value={score} className={`mt-2 h-3 [&>div]:bg-gradient-to-r ${colorClass === 'text-primary' ? 'from-blue-400 to-primary' : 'from-purple-400 to-accent'}`} aria-label={`${title} score: ${score} out of 100`} />
      </CardContent>
    </Card>
  );
}

export function ScoreDisplay({ originalScore, optimizedScore }: ScoreDisplayProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ScoreCard title="Original CV Score" score={originalScore} icon={Gauge} colorClass="text-primary" />
      <ScoreCard title="Optimized CV Score" score={optimizedScore} icon={TrendingUp} colorClass="text-accent" />
    </div>
  );
}
