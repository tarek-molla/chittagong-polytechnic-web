'use server'

import { supabase } from '@/lib/supabase'

export async function submitStudentApplication(formData: {
  fullName: string
  fatherName: string
  motherName: string
  email: string
  phone: string
  nationality: string
  dob: string
  religion: string
  department: string
}) {
  try {
    // We target the correct table name 'applications' verified in image_1fc85c.png
    const { data, error } = await supabase
      .from('applications')
      .insert([
        {
          full_name: formData.fullName,
          father_name: formData.fatherName,
          mother_name: formData.motherName,
          email_address: formData.email,
          phone_number: formData.phone,
          nationality: formData.nationality,
          date_of_birth: formData.dob,
          religion: formData.religion,
          department_choice: formData.department
        }
      ])
      .select()

    if (error) {
      console.error('Supabase insert error:', error)
      return { success: false, message: error.message }
    }

    return { success: true, data }
  } catch (err) {
    console.error('Unexpected exception during insert:', err)
    return { success: false, message: 'An unexpected system error occurred.' }
  }
}