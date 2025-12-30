# Simple AWS Deployment Guide - Step by Step

This guide will help you deploy your website to AWS in the simplest way possible using AWS Amplify.

---

## Step 1: Create a New AWS Account (5 minutes)

### 1.1 Go to AWS Sign Up Page
- Open: https://aws.amazon.com/
- Click **"Create an AWS Account"** (top right)

### 1.2 Enter Your Email
- Enter your email address
- Choose a password
- Click **"Continue"**

### 1.3 Account Information
- **Account name**: Choose any name (e.g., "My Website")
- **Email address**: Your email
- **Password**: Your password
- Click **"Continue"**

### 1.4 Contact Information
- Fill in your details:
  - Full name
  - Phone number
  - Country/Region
  - Address
- Click **"Continue"**

### 1.5 Payment Information
- **Credit/Debit card**: Enter card details
- **Billing address**: Enter address
- Click **"Verify and Add"**
- ⚠️ **Don't worry**: AWS Free Tier gives you 12 months free for many services!

### 1.6 Identity Verification
- AWS will call your phone number
- Enter the verification code you receive
- Click **"Continue"**

### 1.7 Choose Support Plan
- Select **"Basic Plan"** (Free)
- Click **"Complete sign up"**

### 1.8 Wait for Account Activation
- Check your email for confirmation
- Account usually activates in a few minutes

---

## Step 2: Sign In to AWS Console (2 minutes)

### 2.1 Go to AWS Console
- Open: https://console.aws.amazon.com/
- Click **"Sign in to the Console"**

### 2.2 Sign In
- **Account ID or email**: Your email address
- **Password**: Your password
- Click **"Sign in"**

### 2.3 Select Region
- In the top-right, click the region dropdown
- Select **"Europe (London) eu-west-2"** (or your preferred region)
- ⚠️ **Important**: Remember which region you choose!

---

## Step 3: Deploy Your Code with AWS Amplify (10 minutes)

### 3.1 Open AWS Amplify
- In the AWS Console search bar (top), type: **"Amplify"**
- Click on **"AWS Amplify"**

### 3.2 Create New App
- Click the orange button: **"New app"**
- Select **"Host web app"**

### 3.3 Connect GitHub
- You'll see options: **GitHub**, **GitLab**, **Bitbucket**, **Deploy without Git**
- Click **"GitHub"**
- Click **"Authorize AWS Amplify"**
- You'll be redirected to GitHub to authorize
- Click **"Authorize aws-amplify-console"**
- You'll be redirected back to AWS

### 3.4 Select Your Repository
- You should see: **"Shreyas-Profile/my-website"**
- Click on it to select
- Click **"Next"**

### 3.5 Configure Build Settings
- **Branch**: Select **"main"** from dropdown
- **App root**: Type **"frontend"** (this tells Amplify where your frontend code is)
- **Build settings**: Leave as **"amplify.yml"** (it will auto-detect)
- Click **"Next"**

### 3.6 Review Settings
- Review the configuration
- Click **"Save and deploy"**

### 3.7 Wait for Deployment
- You'll see a deployment in progress
- This takes about 5-10 minutes
- ⏳ **Be patient!** First deployment takes longer

### 3.8 Get Your Website URL
- Once deployment completes, you'll see:
  - ✅ **Provision** (green checkmark)
  - ✅ **Build** (green checkmark)
  - ✅ **Deploy** (green checkmark)
- Your website URL will be shown (e.g., `https://main-xxxxx.amplifyapp.com`)
- **Copy this URL!** This is your live website!

---

## Step 4: Set Up Backend (Optional - Later)

Your backend can be deployed separately. For now, your frontend is live!

### Quick Backend Options:
1. **AWS App Runner** (Simple container hosting)
2. **Railway** (Very simple, free tier available)
3. **Render** (Simple, free tier available)

We can set this up later if needed.

---

## Step 5: Automatic Deployments (Already Set Up!)

✅ **Good news!** Every time you push code to the `main` branch on GitHub, AWS Amplify will automatically:
- Detect the changes
- Build your website
- Deploy the new version

**You don't need to do anything!** Just push to GitHub and wait 5-10 minutes.

---

## Troubleshooting

### Problem: "Build failed"
- **Solution**: Check that `app root` is set to `frontend`
- Make sure `amplify.yml` file exists in your repository

### Problem: "Can't connect to GitHub"
- **Solution**: Re-authorize GitHub in Amplify settings
- Go to: Amplify → Your app → App settings → General → Source

### Problem: "Website shows blank page"
- **Solution**: Check browser console for errors
- Verify `VITE_API_URL` environment variable is set (if using backend)

---

## What You've Accomplished

✅ Created AWS account  
✅ Deployed frontend to AWS Amplify  
✅ Set up automatic deployments from GitHub  
✅ Your website is live on the internet!

---

## Next Steps (Optional)

1. **Custom Domain**: Add your own domain name
2. **Backend Deployment**: Deploy your FastAPI backend
3. **Environment Variables**: Configure API URLs
4. **SSL Certificate**: Automatically handled by AWS!

---

## Cost Estimate

- **AWS Amplify**: Free tier includes:
  - 15 GB storage per month
  - 5 GB served per month
  - 1,000 build minutes per month
- **For a small website**: You'll likely stay within free tier!

---

## Need Help?

If you get stuck at any step, let me know which step and what error message you see!

