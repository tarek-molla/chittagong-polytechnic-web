'use server'

import { supabase } from '@/lib/supabase'

export async function getStudentResult(rollNum: string, regNum: string) {
  const cleanRoll = rollNum.trim()
  const cleanReg = regNum.trim()

  if (!cleanRoll || !cleanReg) {
    return { success: false, message: "Roll and Registration numbers are required." }
  }

  try {
    const { data, error } = await supabase
      .from('results')
      .select('*')
      .eq('roll_num', cleanRoll)
      .eq('reg_num', cleanReg)

    if (error) {
      console.error('Supabase fetch error:', error)
      return { success: false, message: 'Database fetching failed.' }
    }

    if (!data || data.length === 0) {
      return { success: false, message: 'No records found matching those credentials.' }
    }

    return { success: true, results: data }
  } catch (err) {
    console.error('Unexpected error:', err)
    return { success: false, message: 'An unexpected error occurred.' }
  }
}