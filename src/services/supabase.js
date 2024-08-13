import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://zmsoleahzoisiedezvwp.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inptc29sZWFoem9pc2llZGV6dndwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI4NjI5OTksImV4cCI6MjAzODQzODk5OX0.IcTPYRrlHophDRlfEczsm2qSqYpoyxm-nxkNwizkbk4";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
