
"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileEdit } from "lucide-react";

interface OptimizedCvSectionProps {
  optimizedCv: string;
}

export function OptimizedCvSection({ optimizedCv }: OptimizedCvSectionProps) {
  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([optimizedCv], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "optimized_cv.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(element.href);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-headline">
          <FileEdit className="h-6 w-6 text-primary" />
          Optimized CV
        </CardTitle>
        <CardDescription>
          Review your AI-optimized CV below. You can copy or download it.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          value={optimizedCv}
          readOnly
          className="min-h-[300px] bg-muted/30 text-sm"
          aria-label="Optimized CV Text"
        />
      </CardContent>
      <CardFooter>
        <Button onClick={handleDownload} className="bg-accent hover:bg-accent/90 text-accent-foreground" aria-label="Download Optimized CV">
          <Download className="mr-2 h-4 w-4" />
          Download Optimized CV (.txt)
        </Button>
      </CardFooter>
    </Card>
  );
}
