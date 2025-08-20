# QR Code Explainer App - Setup & Deployment Guide

## 📧 EmailJS Configuration

To enable the contact form functionality, you need to set up EmailJS:

### Step 1: Create EmailJS Account
1. Go to [emailjs.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Create Email Service
1. Go to "Email Services" in your EmailJS dashboard
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions to connect your email
5. Note down your **Service ID**

### Step 3: Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template structure:

```html
Subject: New Contact Form Submission from {{from_name}}

From: {{from_name}}
Email: {{from_email}}
Message: {{message}}
```

4. Save the template and note down your **Template ID**

### Step 4: Get Public Key
1. Go to "Integration" in your dashboard
2. Copy your **Public Key**

### Step 5: Update Contact Component
Your EmailJS credentials have been configured:

```javascript
// Your actual EmailJS credentials (already configured)
const serviceId = 'service_kitcb9y';      // Your Service ID
const templateId = 'template_esivch8';    // Your Template ID  
const publicKey = '-WLZUWyIv9ceVlEXOU';   // Your Public Key
```

## 🚀 Vercel Deployment

### Prerequisites
- GitHub account
- Git repository (if not already created)

### Step 1: Prepare Your Repository
1. Initialize git (if not done):
```bash
git init
git add .
git commit -m "Initial commit: QR Code Explainer App"
```

2. Create GitHub repository and push:
```bash
git remote add origin https://github.com/yourusername/qr-code-explainer.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com/)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Configure:
   - **Framework Preset**: Create React App
   - **Root Directory**: `./` (or `qr-code-explainer` if needed)
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

### Step 3: Environment Variables (Optional)
If you want to secure your EmailJS credentials:

1. In Vercel dashboard, go to your project settings
2. Add environment variables:
   - `REACT_APP_EMAILJS_SERVICE_ID`
   - `REACT_APP_EMAILJS_TEMPLATE_ID`
   - `REACT_APP_EMAILJS_PUBLIC_KEY`

3. Update Contact.js to use environment variables:
```javascript
const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';
```

### Step 4: Deploy
1. Click "Deploy"
2. Vercel will automatically build and deploy your app
3. You'll get a live URL like: `https://your-app-name.vercel.app`

## 🔧 Build Optimization

### For Production Build
Before deploying, test your production build locally:

```bash
npm run build
npx serve -s build
```

### Performance Tips
1. **Lighthouse Score**: Run Lighthouse in Chrome DevTools to check performance
2. **Bundle Analysis**: Analyze bundle size with:
```bash
npx webpack-bundle-analyzer build/static/js/*.js
```

## 📱 Mobile Optimization
The app is already responsive, but test on various devices:
- Use Chrome DevTools device simulator
- Test on actual mobile devices
- Check touch interactions

## 🔒 Security Notes
1. Never commit your EmailJS credentials to git
2. Use environment variables for sensitive data
3. Consider rate limiting for the contact form

## 🌐 Custom Domain (Optional)
1. In Vercel dashboard, go to your project
2. Go to "Domains" tab
3. Add your custom domain
4. Follow DNS configuration instructions

## 📊 Analytics (Optional)
Add Google Analytics or Vercel Analytics:
1. Vercel Analytics: Enable in project settings
2. Google Analytics: Add tracking code to `public/index.html`

## 🔄 Continuous Deployment
Vercel automatically redeploys when you push to your main branch:
1. Make changes locally
2. Commit and push to GitHub
3. Vercel automatically rebuilds and deploys

Your QR Code Explainer app is now production-ready! 🎉
