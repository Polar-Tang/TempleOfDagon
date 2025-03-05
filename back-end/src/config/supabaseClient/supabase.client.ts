
import { createClient } from '@supabase/supabase-js'
import ENVIRONMENT from '../environment.js'


// const supabaseUrl = 'https://azggnexovdrdleuzlflb.supabase.co'
// const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(process.env.SUPABASE_project_URL, process.env.SUPABASE_apiKey)
export default supabase