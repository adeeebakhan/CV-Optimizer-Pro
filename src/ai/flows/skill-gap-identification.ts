'use server';

/**
 * @fileOverview Identifies skill gaps between a CV and a job description.
 *
 * - identifySkillGaps - A function that identifies skill gaps.
 * - SkillGapIdentificationInput - The input type for the identifySkillGaps function.
 * - SkillGapIdentificationOutput - The return type for the identifySkillGaps function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SkillGapIdentificationInputSchema = z.object({
  cv: z.string().describe('The content of the CV.'),
  jobDescription: z.string().describe('The job description.'),
});
export type SkillGapIdentificationInput = z.infer<
  typeof SkillGapIdentificationInputSchema
>;

const SkillGapIdentificationOutputSchema = z.object({
  skillGaps: z
    .array(z.string())
    .describe('An array of skill gaps between the CV and job description.'),
});
export type SkillGapIdentificationOutput = z.infer<
  typeof SkillGapIdentificationOutputSchema
>;

export async function identifySkillGaps(
  input: SkillGapIdentificationInput
): Promise<SkillGapIdentificationOutput> {
  return skillGapIdentificationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'skillGapIdentificationPrompt',
  input: {schema: SkillGapIdentificationInputSchema},
  output: {schema: SkillGapIdentificationOutputSchema},
  prompt: `You are an expert career advisor.

  Identify the skills mentioned in the job description that are not evident in the CV.
  Return these skill gaps as a list of strings.

  Job Description: {{{jobDescription}}}
  CV: {{{cv}}}
  Skill Gaps:`,
});

const skillGapIdentificationFlow = ai.defineFlow(
  {
    name: 'skillGapIdentificationFlow',
    inputSchema: SkillGapIdentificationInputSchema,
    outputSchema: SkillGapIdentificationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
