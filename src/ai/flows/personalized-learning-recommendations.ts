// 'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating personalized learning recommendations based on identified skill gaps.
 *
 * - personalizedLearningRecommendations - A function that generates personalized learning recommendations.
 * - PersonalizedLearningRecommendationsInput - The input type for the personalizedLearningRecommendations function.
 * - PersonalizedLearningRecommendationsOutput - The return type for the personalizedLearningRecommendations function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedLearningRecommendationsInputSchema = z.object({
  cvText: z.string().describe("The candidate's CV text."),
  jobDescriptionText: z.string().describe('The job description text.'),
  skillGaps: z.string().describe('The identified skill gaps between the CV and the job description.'),
});
export type PersonalizedLearningRecommendationsInput = z.infer<
  typeof PersonalizedLearningRecommendationsInputSchema
>;

const PersonalizedLearningRecommendationsOutputSchema = z.object({
  learningRecommendations: z
    .array(z.string())
    .describe('A list of personalized learning recommendations for each skill gap.'),
});

export type PersonalizedLearningRecommendationsOutput = z.infer<
  typeof PersonalizedLearningRecommendationsOutputSchema
>;

export async function personalizedLearningRecommendations(
  input: PersonalizedLearningRecommendationsInput
): Promise<PersonalizedLearningRecommendationsOutput> {
  return personalizedLearningRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedLearningRecommendationsPrompt',
  input: {schema: PersonalizedLearningRecommendationsInputSchema},
  output: {schema: PersonalizedLearningRecommendationsOutputSchema},
  prompt: `You are an expert career coach specializing in crafting actionable and personalized learning recommendations. Your goal is to help the candidate bridge their skill gaps effectively.

For each identified skill gap, provide a clear, concise, and practical learning recommendation. These recommendations should be:
- Action-oriented: Start with a verb (e.g., "Revise", "Implement", "Practice", "Research", "Create").
- Specific: Suggest concrete steps, projects, or areas of focus.
- Impactful: Where appropriate, guide the user to think about quantifying the results of their learning or application of skills.
- Varied: Offer a mix of suggestions, such as CV enhancements, small practical projects, skill-building exercises, or specific areas to research and apply.
- Encouraging: Maintain a supportive and professional tone.

Base these recommendations on the candidate's CV, the job description, and the provided skill gaps.

Candidate's CV:
{{{cvText}}}

Job Description:
{{{jobDescriptionText}}}

Identified Skill Gaps:
{{{skillGaps}}}

Generate a list of personalized learning recommendations. Each recommendation should be a separate string in an array.
Learning Recommendations:
`,
});

const personalizedLearningRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedLearningRecommendationsFlow',
    inputSchema: PersonalizedLearningRecommendationsInputSchema,
    outputSchema: PersonalizedLearningRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
