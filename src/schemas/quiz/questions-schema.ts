import { z } from 'zod';

/**
 * Questions schema.
 */
export const QuestionsSchema = z.record(
  z.string(),
  z.object({
    id: z.string(),
    question: z.string().min(1, 'La pregunta es requerida'),
    options: z.array(
      z.object({
        description: z.string().min(1, 'La opción es requerida'),
        isCorrect: z.boolean().default(false),
      })
    ),
  })
);

/**
 * Questions schema type.
 */
export type QuestionSchemaType = z.infer<typeof QuestionsSchema>;
