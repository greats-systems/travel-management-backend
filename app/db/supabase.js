import { createClient } from "@supabase/supabase-js";
import env from 'dotenv'

env.config()

const supabase = createClient(process.env.SUPABASE_URL, process.env.SERVICE_ROLE_KEY)

export default supabase
