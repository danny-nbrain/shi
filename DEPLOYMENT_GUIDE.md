# Raffle SHI - Render Deployment Guide

## Prerequisites
1. GitHub account
2. Render account (connected to your GitHub)
3. Stripe account with API keys
4. Database connection string

## Step 1: Push Code to GitHub

1. Create a new repository on GitHub (e.g., `raffle-shi`)
2. Run these commands:

```bash
cd "/Users/dannydemichele/Raffle SHI"
git add .
git commit -m "Initial commit - Raffle SHI platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/raffle-shi.git
git push -u origin main
```

## Step 2: Create PostgreSQL Database on Render

1. Go to Render Dashboard
2. Click "New +" → "PostgreSQL"
3. Configure:
   - **Name**: `raffle-shi-db`
   - **Database**: `raffle_shi`
   - **User**: `raffle_user`
   - **Region**: Oregon (US West)
   - **Plan**: Starter ($7/month)
4. Click "Create Database"
5. **IMPORTANT**: Copy the "Internal Database URL" - you'll need this

## Step 3: Create Web Service on Render

### Option A: Via Render Dashboard (Recommended)

1. Go to Render Dashboard
2. Click "New +" → "Web Service"
3. Connect your GitHub repository `raffle-shi`
4. Configure:
   - **Name**: `raffle-shi`
   - **Region**: Oregon (US West)
   - **Branch**: `main`
   - **Root Directory**: `raffle`
   - **Runtime**: Node
   - **Build Command**: `npm install && npx prisma generate && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Starter ($7/month)

5. Add Environment Variables (click "Advanced" → "Add Environment Variable"):

```
NODE_ENV=production
DATABASE_URL=[paste your database internal URL from Step 2]
STRIPE_SECRET_KEY=[your Stripe secret key]
STRIPE_WEBHOOK_SECRET=[your Stripe webhook secret - leave empty for now]
ADMIN_USERNAME=admin
ADMIN_PASSWORD=[create a strong password]
JWT_SECRET=[generate a random string, e.g., openssl rand -base64 32]
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=[your Stripe publishable key]
```

6. Click "Create Web Service"

### Option B: Via Blueprint (render.yaml)

If you prefer using the render.yaml file:

1. Go to Render Dashboard
2. Click "New +" → "Blueprint"
3. Connect your repository
4. Render will detect the `render.yaml` file
5. Fill in the environment variables when prompted

## Step 4: Run Database Migrations

After the service is deployed:

1. Go to your Render service
2. Click "Shell" tab
3. Run:

```bash
cd raffle
npx prisma db push
npm run db:seed
```

This will:
- Create all database tables
- Seed initial data (admin user, drawings, prizes)

## Step 5: Configure Stripe Webhooks

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. Enter your Render URL: `https://raffle-shi.onrender.com/api/webhooks/stripe`
4. Select events to listen for:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy the "Signing secret"
6. Update the `STRIPE_WEBHOOK_SECRET` environment variable in Render
7. Restart the service

## Step 6: Upload Prize Images

1. Access your deployed site
2. Login to admin: `https://raffle-shi.onrender.com/admin`
3. Upload prize images in the admin dashboard

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment | `production` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host/db` |
| `STRIPE_SECRET_KEY` | Stripe secret API key | `sk_live_...` |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret | `whsec_...` |
| `ADMIN_USERNAME` | Admin login username | `admin` |
| `ADMIN_PASSWORD` | Admin login password | `[strong password]` |
| `JWT_SECRET` | JWT signing secret | `[random string]` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | `pk_live_...` |

## Troubleshooting

### Database Connection Issues
- Ensure you're using the "Internal Database URL" from Render
- Check that Prisma schema matches your database

### Build Failures
- Check build logs in Render dashboard
- Ensure all dependencies are in package.json
- Verify Node version compatibility

### Deployment Not Updating
- Check that auto-deploy is enabled
- Manually trigger deploy from Render dashboard
- Clear build cache if needed

## Post-Deployment Checklist

- [ ] Database created and migrations run
- [ ] Service deployed successfully
- [ ] Environment variables configured
- [ ] Admin login works
- [ ] Stripe test payment works
- [ ] Stripe webhooks configured
- [ ] Prize images uploaded
- [ ] Free ticket submission works
- [ ] Email notifications work (if configured)

## Monitoring

- Monitor service health in Render dashboard
- Check logs for errors
- Set up uptime monitoring (optional)
- Configure custom domain (optional)

## Costs (Estimated Monthly)

- Web Service (Starter): $7/month
- PostgreSQL (Starter): $7/month
- **Total**: ~$14/month

## Support

For issues, check:
1. Render logs
2. Browser console
3. Database connection
4. Environment variables

