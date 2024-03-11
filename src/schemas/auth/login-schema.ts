import { z } from 'zod';

/**
 * Login form validation schema.
 */
export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, 'El correo es requerido')
    .email('El correo no es valido'),
  password: z.string().min(1, 'La contraseña es requerida'),
});

/**
 * Login form validation schema type.
 */
export type LoginSchemaType = z.infer<typeof LoginSchema>;
