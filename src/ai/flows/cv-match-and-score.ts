'use server';
/**
 * @fileOverview An AI agent for CV matching and scoring against a job description.
 *
 * - cvMatchAndScore - A function that handles the CV matching and scoring process.
 * - CvMatchAndScoreInput - The input type for the cvMatchAndScore function.
 * - CvMatchAndScoreOutput - The return type for the cvMatchAndScore function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CvMatchAndScoreInputSchema = z.object({
  cvText: z.string().describe("The candidate's CV text."),
  jobDescriptionText: z.string().describe('The job description text.'),
});
export type CvMatchAndScoreInput = z.infer<typeof CvMatchAndScoreInputSchema>;

const CvMatchAndScoreOutputSchema = z.object({
  originalCvScore: z
    .number()
    .describe('The match score of the original CV against the job description (out of 100).'),
  optimizedCv: z.string().describe('The optimized CV text.'),
  optimizedCvScore: z
    .number()
    .describe('The match score of the optimized CV against the job description (out of 100).'),
  skillGaps: z.string().describe('Identified skill gaps based on the CV and job description.'),
});
export type CvMatchAndScoreOutput = z.infer<typeof CvMatchAndScoreOutputSchema>;

export async function cvMatchAndScore(input: CvMatchAndScoreInput): Promise<CvMatchAndScoreOutput> {
  return cvMatchAndScoreFlow(input);
}

const prompt = ai.definePrompt({
  name: 'cvMatchAndScorePrompt',
  input: {schema: CvMatchAndScoreInputSchema},
  output: {schema: CvMatchAndScoreOutputSchema},
  prompt: `You are an expert career coach. You will evaluate a CV against a job description and provide a match score, an optimized CV, an optimized CV score, and identify skill gaps.

Evaluate the following CV against the job description.

CV:
{{{cvText}}}

Job Description:
{{{jobDescriptionText}}}

Provide the following output:

originalCvScore: The match score of the original CV against the job description (out of 100). Be strict in your scoring.
optimizedCv: The optimized CV text. This CV should be written to maximize the score against the job description. Only rewrite the CV, do not include other information.
optimizedCvScore: The match score of the optimized CV against the job description (out of 100). This score should be higher than the originalCvScore.
skillGaps: Identified skill gaps based on the CV and job description. List the skills that are present in the job description but missing or underdeveloped in the CV.

Make sure the output is valid JSON and nothing else. Do not start or end your response with any additional text besides the JSON. Only generate the output, nothing else.`,
});

const cvMatchAndScoreFlow = ai.defineFlow(
  {
    name: 'cvMatchAndScoreFlow',
    inputSchema: CvMatchAndScoreInputSchema,
    outputSchema: CvMatchAndScoreOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
