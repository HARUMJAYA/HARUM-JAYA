import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://fboeirqjzwtcxwcaabcw.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZib2VpcnFqend0Y3h3Y2FhYmN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc1Njk4MTUsImV4cCI6MjEwMzE0NTgxNX0.0_q8QT_650JVYjlVk5JqjGJISmIytJNLPVaogy8FbpQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);