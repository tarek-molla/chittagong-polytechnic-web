'use server'

import { supabase } from '@/lib/supabase'

export async function getStudentResult(rollNum: string, department: string, semester: string) {
  const cleanRoll = rollNum.trim()
  const cleanDept = department.trim().toUpperCase()
  const cleanSem = semester.trim().toUpperCase()

  if (!cleanRoll) {
    return { success: false, message: "Board Roll number is required." }
  }

  try {
    // Exact structural query check returning an array instead of forcing a single model object crash
    const { data, error } = await supabase
      .from('results')
      .select('*')
      .eq('roll_num', cleanRoll)
      .eq('department', cleanDept)
      .eq('semester', cleanSem)

    if (error) {
      console.error('Supabase fetch error:', error)
      return { success: false, message: `Database Error: ${error.message}` }
    }

    // Process array boundaries safely manually
    if (!data || data.length === 0) {
      // Flexible loose match lookup handling trailing whitespaces seamlessly
      const { data: looseData, error: looseError } = await supabase
        .from('results')
        .select('*')
        .ilike('roll_num', `%${cleanRoll}%`)
        .ilike('department', cleanDept)
        .ilike('semester', cleanSem)

      if (looseError) return { success: false, message: looseError.message }
      if (!looseData || looseData.length === 0) {
        return { success: false, message: 'No certified marksheet found matching these structural parameters.' }
      }
      
      return { success: true, data: looseData[0] } // Safely grab the first matched record
    }

    return { success: true, data: data[0] } // Safely grab the first matched record
  } catch (err) {
    console.error('Unexpected action error:', err)
    return { success: false, message: 'An unexpected system error occurred.' }
  }
}