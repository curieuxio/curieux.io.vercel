import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient("https://hdkjnvxtgbxhjdqjwknl.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMzYwMDU4MSwiZXhwIjoxOTQ5MTc2NTgxfQ.PX0eRFSZfCEImjFFUbKy9NVpoGSoj9mWK-badFmiTsY");
