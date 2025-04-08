import { createClient } from "@supabase/supabase-js";
import env from 'dotenv'

env.config()

const supabase = createClient(process.env.LOCAL_SUPABASE_URL, process.env.LOCAL_SUPABASE_SERVICE_ROLE_KEY)

export default supabase
