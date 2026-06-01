'use server'

import { supabase } from '@/lib/supabase'
import { z } from 'zod'

const studentSchema = z.object({
  full_name: z.string().min(2, "Full name is required"),
  father_name: z.string().min(2, "Father's name is required"),
  mother_name: z.string().min(2, "Mother's name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  nationality: z.string().min(2, "Nationality is required"),
  dob: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date of birth",
  }),
  religion: z.string().min(2, "Religion is required"),
  department: z.string().min(2, "Department is required"),
})

export type StudentData = z.infer<typeof studentSchema>

export async function applyStudent(formData: FormData) {
  // Extract data from FormData
  const rawData = Object.fromEntries(formData.entries())

  // Validate data
  const validated = studentSchema.safeParse(rawData)

  if (!validated.success) {
    return {
      success: false,
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
      }
    }

    return {
      success: true,
      message: 'Application submitted successfully!',
      data: data[0],
    }
  } catch (err) {
    console.error('Unexpected error:', err)
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again later.',
    }
  }
}
