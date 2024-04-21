
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jbibemevmengmpvajoks.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiaWJlbWV2bWVuZ21wdmFqb2tzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM2MjM1MTcsImV4cCI6MjAyOTE5OTUxN30.Fi0tZypBcXY5icVzDGQmKpVYnUI25icmvI-ka8NoUno'
export const supabase = createClient(supabaseUrl, supabaseKey)