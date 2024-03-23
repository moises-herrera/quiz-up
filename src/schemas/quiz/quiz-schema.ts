import { z } from 'zod';

/**
 * Quiz validation schema.
 */
export const QuizSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  description: z.string().optional(),
  image: z.any().optional(),
  category: z.string().min(1, 'La categoría es requerida'),
  questions: z.array(
    z.object({
      question: z.string().min(1, 'La pregunta es requerida'),
      options: z.array(
        z.object({
          description: z.string().min(1, 'La opción es requerida'),
          isCorrect: z.boolean(),
        })
      ),
    })
  ),
});

/**
 * Quiz schema type.
 */
export type QuizSchemaType = z.infer<typeof QuizSchema>;
