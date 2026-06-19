"use client";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://orpwdmnfuzyujpyczlcn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // Use your full key here

export const supabase = createClient(supabaseUrl, supabaseAnonKey);