# 🚀 Vercel Deployment Guide

## Required Environment Variables for Vercel

### Frontend Environment Variables
Configure these in Vercel Dashboard → Settings → Environment Variables:

```
VITE_GEMINI_API_KEY=AIzaSyB6dGdy65RGEvEFqxZ4eIGF_VPWwzBvUT0
VITE_SUPABASE_URL=https://upfjytumummgbnzykijj.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwZmp5dHVtdW1tZ2JuenlraWpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0NTc4NzcsImV4cCI6MjA4MDAzMzg3N30.TFTJnFnRzi-zJ_W2c3laH3bZ19HcW4wcrmwinyJxAWI
```

## ⚠️ CRITICAL: Get Your Service Role Key

1. Go to Supabase Dashboard: https://supabase.com/dashboard/project/upfjytumummgbnzykijj/settings/api
2. Scroll down to "Project API keys"
3. Copy the **service_role** key (it's different from the anon key!)
4. Update `server/.env` with the correct SERVICE_ROLE_KEY

## Steps to Fix Vercel Deployment

### Step 1: Fix Authentication in Supabase
Run this SQL in Supabase SQL Editor to confirm all users:

```sql
-- Confirm all existing user emails
UPDATE auth.users 
SET email_confirmed_at = NOW(), 
    confirmed_at = NOW() 
WHERE email_confirmed_at IS NULL;

-- Create missing user profiles
INSERT INTO public.user_profiles (id, email, role)
SELECT id, email, 'user'
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.user_profiles)
ON CONFLICT (id) DO NOTHING;

-- Make anouarbarbero@gmail.com an admin
UPDATE public.user_profiles 
SET role = 'admin' 
WHERE email = 'anouarbarbero@gmail.com';
```

### Step 2: Update Backend Service Role Key
1. Get the **service_role** key from Supabase (see link above)
2. Update `server/.env` file with the correct key
3. Commit and push changes:

```bash
git add server/.env
git commit -m "Update service role key for backend"
git push
```

### Step 3: Configure Vercel Environment Variables
1. Go to: https://vercel.com/ANOUAR90ESS/nexus-ai-hub/settings/environment-variables
2. Add these variables:
   - `VITE_GEMINI_API_KEY`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Click "Save"

### Step 4: Redeploy
1. Go to Vercel Dashboard → Deployments
2. Click "Redeploy" on the latest deployment
3. Or push a new commit to trigger automatic deployment

## Testing the Live Site

After deployment, test these features:

1. **Registration**: Create a new account
2. **Login**: Login with the registered account
3. **Admin Access**: Login with anouarbarbero@gmail.com (should see admin dashboard)
4. **Tool Search**: Use the search functionality
5. **AI Demos**: Test Gemini AI integrations

## Troubleshooting

### Issue: Users can't login
- ✅ Run the SQL queries above to confirm user emails
- ✅ Check that user_profiles table exists
- ✅ Verify RLS policies are enabled

### Issue: "Supabase not configured" error
- ✅ Check environment variables in Vercel
- ✅ Make sure all variables start with `VITE_`
- ✅ Redeploy after adding variables

### Issue: Admin features not working
- ✅ Check user_profiles table for admin role
- ✅ Clear browser cache and cookies
- ✅ Login again after confirming email

## Backend Server Note

⚠️ **Important**: The Express backend in `/server` is for local development only. 
For production, you may need to:
1. Deploy the backend separately (Railway, Render, etc.)
2. Or use Supabase Edge Functions instead of the Express server
3. Or integrate the backend as Vercel Serverless Functions

## Links
- **Live Site**: https://nexus-ai-hub-anouar90ess.vercel.app (update with your actual URL)
- **GitHub**: https://github.com/ANOUAR90ESS/nexus-ai-hub
- **Supabase Dashboard**: https://supabase.com/dashboard/project/upfjytumummgbnzykijj
