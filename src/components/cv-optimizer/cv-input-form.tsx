
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ClipboardList, Sparkles, Loader2, UploadCloud, Linkedin } from "lucide-react";

const formSchema = z.object({
  cvFile: z.instanceof(File, { message: "Please upload your CV file." })
    .refine(file => file.size > 0, "CV file cannot be empty.")
    .refine(
      file => file.type === "text/plain",
      "Only .txt files are accepted for now. Support for PDF/DOCX will be added later."
    ),
  linkedinProfileUrl: z.string().url({ message: "Please enter a valid LinkedIn profile URL." }).optional().or(z.literal('')),
  jobDescriptionText: z.string().min(50, { message: "Job description text must be at least 50 characters." }),
});

export type CvInputFormValues = z.infer<typeof formSchema>;

interface CvInputFormProps {
  onSubmit: SubmitHandler<CvInputFormValues>;
  isLoading: boolean;
}

export function CvInputForm({ onSubmit, isLoading }: CvInputFormProps) {
  const form = useForm<CvInputFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cvFile: undefined,
      linkedinProfileUrl: "",
      jobDescriptionText: "",
    },
  });

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-headline">
          <Sparkles className="h-6 w-6 text-accent" />
          Analyze Your CV
        </CardTitle>
        <CardDescription>
          Upload your CV, optionally provide your LinkedIn profile, and paste the job description below to get AI-powered insights.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="cvFile"
              render={({ field: { onChange, onBlur, name, ref } }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-lg">
                    <UploadCloud className="h-5 w-5" />
                    Upload Your CV (.txt only)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".txt"
                      onChange={(e) => onChange(e.target.files?.[0])}
                      onBlur={onBlur}
                      name={name}
                      ref={ref}
                      aria-label="CV File Upload"
                      className="text-sm file:mr-4 file:px-3 file:py-1 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="linkedinProfileUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-lg">
                    <Linkedin className="h-5 w-5" />
                    LinkedIn Profile URL (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://www.linkedin.com/in/yourprofile"
                      {...field}
                      aria-label="LinkedIn Profile URL"
                      className="text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jobDescriptionText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-lg">
                    <ClipboardList className="h-5 w-5" />
                    Job Description Text
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Paste the full job description text here..."
                      className="min-h-[200px] text-sm"
                      {...field}
                      aria-label="Job Description Text Input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading} aria-label="Match and Score CV">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Match & Score
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
