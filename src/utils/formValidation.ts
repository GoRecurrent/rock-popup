import { z } from 'zod';

/**
 * Validation schemas for wizard form data
 * All user inputs are validated before being sent to external webhooks
 */

// Allowed values for step 1
const STEP1_OPTIONS = [
  "High quality education",
  "Faith and character development",
  "Extracurricular activities",
  "Physical and emotional safety"
] as const;

// Allowed values for step 2
const STEP2_OPTIONS = [
  "Affordability",
  "Class size",
  "Academic rigor",
  "Fitting in / social environment"
] as const;

// Allowed grade levels
const GRADE_LEVELS = [
  "Transitional Kindergarten",
  "Pre-K",
  "Kindergarten",
  "1st Grade",
  "2nd Grade",
  "3rd Grade",
  "4th Grade",
  "5th Grade",
  "6th Grade",
  "7th Grade",
  "8th Grade",
  "9th Grade",
  "10th Grade",
  "11th Grade",
  "12th Grade"
] as const;

/**
 * Child information schema
 */
const childSchema = z.object({
  name: z.string()
    .trim()
    .min(2, { message: "Student name must be at least 2 characters" })
    .max(100, { message: "Student name must be less than 100 characters" })
    .regex(/^[a-zA-Z\s'-]+$/, { message: "Student name can only contain letters, spaces, hyphens, and apostrophes" }),
  gradeLevel: z.enum(GRADE_LEVELS, {
    errorMap: () => ({ message: "Please select a valid grade level" })
  })
});

/**
 * Phone number validation
 * Accepts formatted or unformatted US phone numbers
 */
const phoneSchema = z.string()
  .trim()
  .transform(val => val.replace(/\D/g, '')) // Remove all non-digits
  .refine(val => val.length === 10, {
    message: "Phone number must be exactly 10 digits"
  })
  .refine(val => /^[2-9]\d{9}$/.test(val), {
    message: "Phone number must start with a valid area code (2-9)"
  });

/**
 * Email validation with common domain validation
 */
const emailSchema = z.string()
  .trim()
  .toLowerCase()
  .min(5, { message: "Email must be at least 5 characters" })
  .max(255, { message: "Email must be less than 255 characters" })
  .email({ message: "Please enter a valid email address" })
  .refine(val => {
    // Additional validation: must have valid domain structure
    const domain = val.split('@')[1];
    return domain && domain.includes('.') && domain.split('.').every(part => part.length > 0);
  }, { message: "Email domain is invalid" });

/**
 * Complete form validation schema for first webhook
 * (Steps 1-4)
 */
export const firstWebhookSchema = z.object({
  request_id: z.string().uuid({ message: "Invalid request ID format" }),
  step1: z.enum(STEP1_OPTIONS, {
    errorMap: () => ({ message: "Please select a valid option for step 1" })
  }),
  step2: z.enum(STEP2_OPTIONS, {
    errorMap: () => ({ message: "Please select a valid option for step 2" })
  }),
  step3: z.array(childSchema)
    .min(1, { message: "At least one student is required" })
    .max(3, { message: "Maximum 3 students allowed" }),
  step4ParentGuide: z.string()
    .trim()
    .max(2000, { message: "Response must be less than 2000 characters" })
    .optional()
    .default(""),
  step4Questions: z.string()
    .trim()
    .max(2000, { message: "Questions must be less than 2000 characters" })
    .default("")
});

/**
 * Complete form validation schema for second webhook
 * (All steps including contact information)
 */
export const secondWebhookSchema = firstWebhookSchema.extend({
  step5ParentName: z.string()
    .trim()
    .min(2, { message: "Parent name must be at least 2 characters" })
    .max(100, { message: "Parent name must be less than 100 characters" })
    .regex(/^[a-zA-Z\s'-]+$/, { message: "Parent name can only contain letters, spaces, hyphens, and apostrophes" }),
  step5Email: emailSchema,
  step5Phone: phoneSchema
});

/**
 * Type exports for TypeScript
 */
export type FirstWebhookData = z.infer<typeof firstWebhookSchema>;
export type SecondWebhookData = z.infer<typeof secondWebhookSchema>;

/**
 * Validation helper function
 * Returns validated data or throws with detailed error messages
 */
export const validateFirstWebhook = (data: unknown): FirstWebhookData => {
  return firstWebhookSchema.parse(data);
};

export const validateSecondWebhook = (data: unknown): SecondWebhookData => {
  return secondWebhookSchema.parse(data);
};
