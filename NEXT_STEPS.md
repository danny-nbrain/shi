# Next Steps for Render Deployment

## ✅ Completed
- [x] Git repository initialized
- [x] All code committed
- [x] `.gitignore` configured
- [x] `render.yaml` blueprint created
- [x] Deployment guide written

## 🚀 To Deploy Now

### 1. Create GitHub Repository

Go to https://github.com/new and create a new repository named `raffle-shi` (or any name you prefer).

**DO NOT** initialize with README, .gitignore, or license (we already have these).

### 2. Push Code to GitHub

After creating the repository, run these commands:

```bash
cd "/Users/dannydemichele/Raffle SHI"
git remote add origin https://github.com/YOUR_USERNAME/raffle-shi.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

### 3. Deploy to Render

Once the code is pushed to GitHub, I can create the Render services for you, OR you can do it manually:

#### Option A: I Create It For You (Provide me with):
- Your GitHub repository URL (e.g., `https://github.com/username/raffle-shi`)
- I'll use the workspace: `tea-d50pn963jp1c73aaf5kg`

#### Option B: Manual Creation via Render Dashboard

1. Go to https://dashboard.render.com
2. Click "New +" → "PostgreSQL"
   - Name: `raffle-shi-db`
   - Database: `raffle_shi`
   - Region: Oregon
   - Plan: Starter
   - Click "Create Database"
   - **Copy the Internal Database URL**

3. Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Name: `raffle-shi`
   - Region: Oregon
   - Root Directory: `raffle`
   - Build Command: `npm install && npx prisma generate && npm run build`
   - Start Command: `npm start`
   - Plan: Starter

4. Add Environment Variables:
   ```
   NODE_ENV=production
   DATABASE_URL=[paste internal DB URL from step 2]
   STRIPE_SECRET_KEY=[from stripe_access.txt or Stripe dashboard]
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=[create a strong password]
   JWT_SECRET=[generate with: openssl rand -base64 32]
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=[from Stripe dashboard]
   ```

5. Click "Create Web Service"

### 4. Run Database Setup

After deployment completes:

1. Go to your service in Render dashboard
2. Click "Shell" tab
3. Run:
   ```bash
   cd raffle
   npx prisma db push
   npm run db:seed
   ```

### 5. Configure Stripe Webhooks

1. Go to Stripe Dashboard → Webhooks
2. Add endpoint: `https://YOUR-SERVICE.onrender.com/api/webhooks/stripe`
3. Select events: `checkout.session.completed`, `payment_intent.succeeded`
4. Copy webhook secret
5. Add to Render environment variables as `STRIPE_WEBHOOK_SECRET`

## 📊 Render Services Summary

**Owner ID**: `tea-d50pn963jp1c73aaf5kg`

**Services to Create**:
1. **PostgreSQL Database**
   - Name: raffle-shi-db
   - Region: Oregon
   - Plan: Starter ($7/month)

2. **Web Service**
   - Name: raffle-shi
   - Region: Oregon
   - Plan: Starter ($7/month)

**Total Monthly Cost**: ~$14

## 🔧 Environment Variables Needed

| Variable | Where to Get It |
|----------|-----------------|
| `DATABASE_URL` | Render PostgreSQL Internal URL |
| `STRIPE_SECRET_KEY` | Stripe Dashboard → Developers → API Keys |
| `STRIPE_WEBHOOK_SECRET` | Stripe Dashboard → Webhooks (after creating endpoint) |
| `ADMIN_USERNAME` | Choose one (e.g., "admin") |
| `ADMIN_PASSWORD` | Create a strong password |
| `JWT_SECRET` | Generate: `openssl rand -base64 32` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe Dashboard → Developers → API Keys |

## 📝 What to Tell Me

To proceed with automated deployment, provide:
1. Your GitHub repository URL
2. Confirm workspace ID: `tea-d50pn963jp1c73aaf5kg`
3. Any environment variable values you want me to use

Or just say "I've pushed to GitHub at [URL], please create the Render services"

## 📚 Additional Resources

- Full deployment guide: `DEPLOYMENT_GUIDE.md`
- Stripe access info: `stripe_access.txt`
- Payment links: `payment_links.csv`

