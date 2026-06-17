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
    // Exact structural query check
    const { data, error } = await supabase
      .from('results')
      .select('*')
      .eq('roll_num', cleanRoll)
      .eq('department', cleanDept)
      .eq('semester', cleanSem)
      .maybeSingle()

    if (error) {
      console.error('Supabase fetch error:', error)
      return { success: false, message: `Database Error: ${error.message}` }
    }

    if (!data) {
      // Flexible loose match lookup handling trailing whitespaces seamlessly
      const { data: looseData, error: looseError } = await supabase
        .from('results')
        .select('*')
        .ilike('roll_num', `%${cleanRoll}%`)
        .ilike('department', cleanDept)
        .ilike('semester', cleanSem)
        .maybeSingle()

      if (looseError) return { success: false, message: looseError.message }
      if (!looseData) return { success: false, message: 'No certified marksheet found matching these structural parameters.' }
      
      return { success: true, data: looseData }
    }

    return { success: true, data }
  } catch (err) {
    console.error('Unexpected action error:', err)
    return { success: false, message: 'An unexpected system error occurred.' }
  }
}