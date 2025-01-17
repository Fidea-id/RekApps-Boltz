import { createClient } from '@supabase/supabase-js';

// These are dummy values - replace with actual values later
const supabaseUrl = 'https://feuljfwtrjnfeoxbzxit.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZldWxqZnd0cmpuZmVveGJ6eGl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYzOTY0NTIsImV4cCI6MjA1MTk3MjQ1Mn0.9y1hjIy7f98YwHd2ldhuaPV8GwHRjpd8xrbJYiVSqBA';

export const supabase = createClient(supabaseUrl, supabaseKey);