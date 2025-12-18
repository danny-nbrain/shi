# ✅ Render Deployment - Ready to Deploy

## Code Successfully Pushed to GitHub! 

**Repository**: https://github.com/danny-nbrain/shi

All your code is now on GitHub and ready to deploy to Render.

## 🚀 Quick Deployment Steps

### Step 1: Create PostgreSQL Database

1. Go to https://dashboard.render.com
2. Click "New +" → "PostgreSQL"
3. Fill in:
   - **Name**: `raffle-shi-db`
   - **Database**: `raffle_shi`
   - **User**: `raffle_user`  
   - **Region**: Oregon (US West)
   - **PostgreSQL Version**: 16 (latest)
   - **Plan**: Starter ($7/month)
4. Click **"Create Database"**
5. **IMPORTANT**: Once created, copy the **"Internal Database URL"** (starts with `postgresql://`)

### Step 2: Create Web Service

1. Still in Render dashboard, click "New +" → "Web Service"
2. Click **"Connect account"** if needed, then select your repository: `danny-nbrain/shi`
3. Configure the service:

**Basic Settings:**
- **Name**: `raffle-shi`
- **Region**: Oregon (US West)
- **Branch**: `main`
- **Root Directory**: `raffle`
- **Runtime**: Node
- **Build Command**: 
  ```
  npm install && npx prisma generate && npm run build
  ```
- **Start Command**:
  ```
  npm start
  ```

**Instance Type:**
- **Plan**: Starter ($7/month)

**Environment Variables:**

Click **"Advanced"** → **"Add Environment Variable"** and add these:

```
NODE_ENV=production
```

```
DATABASE_URL=[PASTE YOUR DATABASE INTERNAL URL FROM STEP 1]
```

```
ADMIN_USERNAME=admin
```

```
ADMIN_PASSWORD=[CREATE A STRONG PASSWORD - SAVE THIS!]
```

```
JWT_SECRET=[GENERATE ONE BELOW]
```

```
STRIPE_SECRET_KEY=[YOUR STRIPE SECRET KEY]
```

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=[YOUR STRIPE PUBLISHABLE KEY]
```

```
STRIPE_WEBHOOK_SECRET=[LEAVE EMPTY FOR NOW - ADD LATER]
```

**To generate JWT_SECRET**, run this in your terminal:
```bash
openssl rand -base64 32
```

4. Click **"Create Web Service"**

### Step 3: Wait for Deployment

Render will now:
- Pull your code from GitHub
- Install dependencies
- Build your Next.js app
- Start the service

This takes about 5-10 minutes. Watch the logs for progress.

### Step 4: Run Database Migrations

Once deployed successfully:

1. In your Render dashboard, go to your `raffle-shi` service
2. Click the **"Shell"** tab at the top
3. Run these commands one at a time:

```bash
cd raffle
npx prisma db push
```

Wait for this to complete, then run:

```bash
npm run db:seed
```

This creates:
- All database tables
- Default admin user
- Drawing dates (Dec 1, 15, 22, 29)
- Sample prizes

### Step 5: Set Up Stripe Webhooks

1. Go to https://dashboard.stripe.com/webhooks
2. Click **"Add endpoint"**
3. For **"Endpoint URL"**, enter: `https://raffle-shi.onrender.com/api/webhooks/stripe`
4. Click **"Select events"** and add:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Click **"Add endpoint"**
6. Copy the **"Signing secret"** (starts with `whsec_`)
7. Go back to Render → your service → Environment
8. Add/update: `STRIPE_WEBHOOK_SECRET=[paste the signing secret]`
9. Save and wait for service to redeploy

### Step 6: Test Your Site!

1. Visit: `https://raffle-shi.onrender.com`
2. Login to admin: `https://raffle-shi.onrender.com/admin`
   - Username: `admin`
   - Password: [whatever you set in environment variables]

3. Test a ticket purchase
4. Upload prize images in the admin dashboard
5. Test free ticket submission

## 📊 Your Render Services

**Workspace**: tea-d50pn963jp1c73aaf5kg

**Services Created**:
1. **raffle-shi-db** (PostgreSQL) - $7/month
2. **raffle-shi** (Web Service) - $7/month

**Total Monthly Cost**: $14

## 🔑 Important Information to Save

| Item | Value | Notes |
|------|-------|-------|
| **Site URL** | `https://raffle-shi.onrender.com` | Your live site |
| **Admin URL** | `https://raffle-shi.onrender.com/admin` | Admin dashboard |
| **Admin Username** | `admin` | Set in env vars |
| **Admin Password** | [YOU SET THIS] | Save it securely! |
| **Database URL** | [FROM RENDER] | Internal connection string |
| **Stripe Keys** | [FROM STRIPE] | Publishable & secret keys |
| **JWT Secret** | [GENERATED] | From openssl command |

## 🛠️ Troubleshooting

### If build fails:
- Check the build logs in Render
- Ensure all environment variables are set
- Make sure Node version is compatible

### If database connection fails:
- Verify you used the "Internal Database URL"
- Check that `DATABASE_URL` environment variable is set correctly
- Ensure Prisma schema matches database

### If Stripe payments don't work:
- Verify both Stripe keys are set
- Check webhook is configured with correct URL
- Make sure `STRIPE_WEBHOOK_SECRET` is set

### To view logs:
- In Render dashboard → Your service → Logs tab

### To redeploy:
- Render auto-deploys when you push to GitHub
- Or click "Manual Deploy" → "Deploy latest commit"

## ✅ Post-Deployment Checklist

- [ ] Database created
- [ ] Web service deployed
- [ ] All environment variables configured  
- [ ] Database migrations run (`prisma db push`)
- [ ] Database seeded (`npm run db:seed`)
- [ ] Admin login works
- [ ] Stripe webhooks configured
- [ ] Test ticket purchase works
- [ ] Prize images uploaded
- [ ] Free ticket submission works

## 🎯 Next Steps

1. **Custom Domain** (Optional):
   - In Render → Your service → Settings → Custom Domain
   - Add your domain and configure DNS

2. **SSL Certificate**:
   - Automatically provided by Render for both .onrender.com and custom domains

3. **Monitoring**:
   - Set up monitoring in Render dashboard
   - Configure email alerts for downtime

4. **Backups**:
   - Database backups are automatic on Render
   - Download backups from database dashboard

## 📞 Support

- **Render Docs**: https://docs.render.com
- **Render Support**: support@render.com
- **GitHub Repo**: https://github.com/danny-nbrain/shi

---

**Your platform is ready to deploy! Follow the steps above and you'll be live in about 15 minutes.** 🚀

