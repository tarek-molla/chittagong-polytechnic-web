'use server'

import { supabase } from '@/lib/supabase'
import { z } from 'zod'

// Strict validation schema matching standard CPI requirements
const studentSchema = z.object({
  full_name: z.string().min(2, "Full name is required"),
  father_name: z.string().min(2, "Father's name is required"),
  mother_name: z.string().min(2, "Mother's name is required"),
  email: z.string().email("Invalid email address"),
  // Enforces standard Bangladeshi 11-digit mobile format
  phone: z.string().regex(/^(01)[3-9]\d{8}$/, "Must be a valid 11-digit Bangladeshi mobile number starting with 01"),
  nationality: z.string().min(2, "Nationality is required"),
  dob: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date of birth",
  }),
  religion: z.string().min(2, "Religion is required"),
  department: z.enum([
    'COMPUTER SCIENCE',
    'CIVIL TECHNOLOGY',
    'ELECTRICAL',
    'MECHANICAL',
    'POWER',
    'ELECTRONICS',
    'ENVIRONMENTAL'
  ], {
    errorMap: () => ({ message: "Please select a valid institutional department" })
  }),
})

export type StudentData = z.infer<typeof studentSchema>

export async function applyStudent(prevState: any, formData: FormData) {
  // Extract and clean raw data from form inputs
  const rawData = {
    full_name: formData.get('fullName')?.toString().trim(),
    father_name: formData.get('fatherName')?.toString().trim(),
    mother_name: formData.get('motherName')?.toString().trim(),
    email: formData.get('email')?.toString().trim(),
    phone: formData.get('phone')?.toString().trim(),
    nationality: formData.get('nationality')?.toString().trim(),
    dob: formData.get('dob')?.toString().trim(),
    religion: formData.get('religion')?.toString().trim(),
    department: formData.get('department')?.toString().trim(),
  }

  // Safe parse data against schema validation rules
  const validated = studentSchema.safeParse(rawData)

  if (!validated.success) {
    return {
      success: false,
      message: validated.error.errors[0].message,
      errors: validated.error.flatten().fieldErrors,
    }
  }

  try {
    const { data, error } = await supabase
      .from('students')
      .insert([validated.data])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return {
        success: false,
        message: error.message,
        errors: {}, // Always return an empty object to prevent frontend crashes
      }
    }

    return {
      success: true,
      message: 'Application submitted successfully!',
      errors: {}, // Prevents "Cannot read properties of undefined" on success
      data: data?.[0],
    }
  } catch (err) {
    console.error('Unexpected error:', err)
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again later.',
      errors: {},
    }
  }
}