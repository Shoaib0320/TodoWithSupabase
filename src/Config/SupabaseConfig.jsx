import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = 'https://kzhxjaewpxxvbyaoqjyr.supabase.co';
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6aHhqYWV3cHh4dmJ5YW9xanlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2ODc2MzQsImV4cCI6MjA1NDI2MzYzNH0.8fpGSEETo6AZIdbU_m6Piod0VhM0zFQJy6jxyH08sEA';
// export const supabase = createClient(supabaseUrl, supabaseKey);


const supabaseUrl = "https://kzhxjaewpxxvbyaoqjyr.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6aHhqYWV3cHh4dmJ5YW9xanlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2ODc2MzQsImV4cCI6MjA1NDI2MzYzNH0.8fpGSEETo6AZIdbU_m6Piod0VhM0zFQJy6jxyH08sEA";

export const supabase = createClient(supabaseUrl, supabaseKey);
