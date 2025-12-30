# AWS Amplify Deployment Setup

## Quick Setup Steps

### 1. Frontend Deployment

1. Go to [AWS Amplify Console](https://eu-west-2.console.aws.amazon.com/amplify/home?region=eu-west-2)
2. Click **"New app"** → **"Host web app"**
3. Select **GitHub** as your source
4. Authorize GitHub and select repository: `Shreyas-Profile/my-website`
5. Select branch: `main`
6. **App root**: `frontend`
7. Build settings: Amplify will auto-detect `amplify.yml`
8. Review and click **"Save and deploy"**

### 2. Environment Variables (Frontend)

After initial deployment, add environment variables:
- Go to your app → **Environment variables**
- Add: `VITE_API_URL` = Your backend API URL (you'll get this after backend setup)

### 3. Backend Deployment (Container Hosting)

**Option 1: Using Amplify Backend Environment**
1. In Amplify Console → Your app → **Backend environments**
2. Click **"Add backend environment"**
3. Select **"Container"**
4. Configure:
   - Dockerfile path: `backend/Dockerfile`
   - Port: `8000`
   - Environment variables:
     - `CORS_ORIGINS`: Your frontend Amplify URL (e.g., `https://main-xxxxx.amplifyapp.com`)

**Option 2: Using AWS App Runner (Simpler Alternative)**
1. Go to AWS App Runner (eu-west-2)
2. Create service from container image
3. Connect to ECR or build from source
4. Set port: `8000`
5. Add environment variable: `CORS_ORIGINS` = Your frontend URL

### 4. Update Frontend API URL

Once backend is deployed:
1. Copy the backend URL
2. Go to Amplify → Your app → Environment variables
3. Update `VITE_API_URL` with your backend URL
4. Redeploy frontend

### 5. Custom Domain (Later)

1. In Amplify Console → Your app → **Domain management**
2. Click **"Add domain"**
3. Enter your domain name
4. Follow DNS configuration instructions
5. SSL certificate is automatically provisioned by AWS

## Important Notes

- **Region**: All resources should be in `eu-west-2` (London)
- **CORS**: Backend needs to allow your frontend domain
- **Environment Variables**: Set `CORS_ORIGINS` in backend to include your frontend URL
- **Automatic Deployments**: Every push to `main` branch will trigger a new deployment

## Troubleshooting

- If frontend can't reach backend: Check CORS_ORIGINS includes frontend URL
- If build fails: Check `amplify.yml` configuration
- If backend not accessible: Verify port 8000 is exposed and security groups allow traffic

