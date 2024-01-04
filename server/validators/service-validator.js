const { z } = require('zod')

const serviceSchema = z.object({
  description: z
    .string({ required_error: 'description is required' })
    .trim()
    .min(4, { message: 'description must be least 4 characters' })
    .max(255, { message: 'description must be max 256 characters' }),

  service: z
    .string({ required_error: 'service is required' })
    .trim()
    .min(4, { message: 'service must be least 4 characters' })
    .max(255, { message: 'service must be max 256 characters' }),

  provider: z
    .string({ required_error: 'provider no is required' })
    .trim()
    .min(4, { message: 'provider no must be least 4 characters' })
    .max(255, { message: 'provider must be max 255 characters' }),

  price: z
    .string({ required_error: 'price is required' })
    .trim()
    .min(1, { message: 'price must be least 1 characters' })
    .max(5, { message: 'price must be max 5 characters' })
})

const editServiceSchema = z.object({
  description: z
    .string({ required_error: 'description is required' })
    .trim()
    .min(4, { message: 'description must be least 4 characters' })
    .max(255, { message: 'description must be max 256 characters' })
    .optional(),

  service: z
    .string({ required_error: 'service is required' })
    .trim()
    .min(4, { message: 'service must be least 4 characters' })
    .max(255, { message: 'service must be max 256 characters' })
    .optional(),

  provider: z
    .string({ required_error: 'provider no is required' })
    .trim()
    .min(4, { message: 'provider no must be least 4 characters' })
    .max(255, { message: 'provider must be max 255 characters' })
    .optional(),

  price: z
    .string({ required_error: 'price is required' })
    .trim()
    .min(1, { message: 'price must be least 1 characters' })
    .max(5, { message: 'price must be max 5 characters' })
    .optional()
})

module.exports = {
  serviceSchema,
  editServiceSchema
}
