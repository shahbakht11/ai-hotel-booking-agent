# ðŸš€ Deploying to Vercel

This project can now be deployed directly to Vercel as a Node serverless function.

## 1. Prerequisites
- Vercel account
- Vercel CLI (
pm i -g vercel) or Vercel dashboard access
- Project files pushed to GitHub (optional but recommended)

## 2. Environment Variables
Set these in your Vercel project (Settings â†’ Environment Variables):
- VAPI_API_KEY
- VAPI_AGENT_ID
- VAPI_WEBHOOK_SECRET (optional)

You can copy the values from your local .env file.

## 3. Deploy Steps

### Option A: Vercel CLI
`
vercel login
vercel
# follow prompts (select "server.js" as the entry point if asked)
`

### Option B: Vercel Dashboard
1. Import your Git repo into Vercel
2. When asked for the framework preset choose **Other**
3. Vercel detects server.js via ercel.json
4. Add environment variables
5. Deploy

## 4. Testing
After deployment, your app is available at https://<project>.vercel.app

- Homepage: https://<project>.vercel.app/
- API: https://<project>.vercel.app/api/hotels
- Functions endpoint: https://<project>.vercel.app/api/vapi/functions
- Webhook: https://<project>.vercel.app/api/vapi/webhook

## 5. Troubleshooting
- **404 Not Found**: Ensure ercel.json is deployed and server.js exports the Express app
- **500 Errors**: Check logs (ercel logs <deployment-url>)
- **Environment vars missing**: Set them in Vercel dashboard and redeploy

## 6. Local Preview
`
vercel dev
`
This runs the app locally using Vercel's serverless environment.

---
Happy deploying!
