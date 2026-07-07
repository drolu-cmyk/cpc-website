# Capital Property Care LLC — Professional Website

Modern, clean, high-converting website for **Capital Property Care LLC** (Interior Painting • Albany, NY & Capital Region).

- Uses your custom circular logo
- Matches the professional design you shared (navy + warm gold CTAs)
- Fully responsive + mobile-optimized
- Working quote request form with excellent UX
- Ready for Vercel (recommended) or AWS

---

## 🚀 Quickest Way: Deploy to Vercel (2 minutes)

This is the **recommended and fastest** path.

### Step 1: Create a new Vercel project (no coding needed)

1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Sign in with GitHub
3. Click **"Import Git Repository"**
4. Paste this repo URL (or create a new empty repo first):
   ```
   https://github.com/edwardjones170/cpc-website
   ```
5. Vercel will auto-detect it's a Next.js project.
6. Click **Deploy**.

Your site will be live in under 60 seconds at something like:
`https://cpc-website-xxx.vercel.app`

You can then add your custom domain in Vercel settings.

---

## 📦 Option B: Push to Your GitHub Repo (Full Automation)

Run these commands **on your own computer** (Mac, Windows, or Linux).

### Prerequisites (one-time)
- Node.js 18 or higher installed ([download here](https://nodejs.org))
- Git installed
- A GitHub account

### 1. Get the code on your machine

```bash
# Clone your existing repo (or create a fresh one)
git clone https://github.com/edwardjones170/cpc-website.git
cd cpc-website

# Remove old files (we're replacing everything with the new professional version)
rm -rf app public .next node_modules package*.json next.config.* tsconfig.json README.md
```

### 2. Add the new professional website (copy from this folder)

Copy the **entire contents** of the folder you received from me (`cpc-website` folder) into your local `cpc-website` folder.

Or run this if you have the folder on your machine:

```bash
# Example: if you copied the new folder next to the old one
cp -r ../cpc-website-new/* ./
```

### 3. Install dependencies & test locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you should see the beautiful new site.

### 4. Push to GitHub (one command)

```bash
git add .
git commit -m "feat: Complete professional redesign with custom logo, improved form, and modern design"
git push origin main
```

### 5. Deploy on Vercel (automatic)

After pushing, go to [vercel.com/new](https://vercel.com/new) → import the same repo again.  
Every future `git push` will auto-deploy.

---

## 🛠 Local Development Commands

```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Create production build
npm run start        # Run production build locally
```

---

## 📁 Project Structure

```
cpc-website/
├── app/
│   ├── layout.tsx       # SEO, metadata, fonts
│   ├── page.tsx         # The entire beautiful website
│   └── globals.css      # Professional styling
├── public/
│   ├── logo-optimized.png   # Your custom logo
│   └── hero-living-room.jpg # Hero image
├── README.md
└── package.json
```

---

## ✅ What’s Included

- Your exact circular logo (optimized)
- All original copy preserved
- Modern navy + warm gold professional aesthetic
- Fully working quote form (with validation + success state)
- Mobile hamburger menu
- Smooth scrolling & hover interactions
- Excellent mobile experience
- SEO optimized + Open Graph ready
- Fully portable (works on Vercel, Netlify, AWS Amplify, S3+CloudFront, etc.)

---

## 🔧 Future Improvements (Easy to Add Later)

- Connect form to real email (Resend / Formspree / your CRM)
- Add Google Analytics
- Add real project photos / before-after gallery
- Add testimonials section

Would you like me to add any of these now?

---

**You now have a production-ready, beautiful website.**

Just follow the **"Quickest Way: Deploy to Vercel"** section above and you’ll be live in minutes.

Need help with anything else (custom domain, form email integration, more pages, etc.)? Just tell me.