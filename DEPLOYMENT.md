# Redline - NBA Stats Dashboard

A modern React application for browsing NBA players, teams, and games with multilingual support.

## Deployment to Vercel

### Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. A Balldontlie API key (get one at [balldontlie.io](https://www.balldontlie.io))
3. Your project pushed to a Git repository (GitHub, GitLab, or Bitbucket)

### Step-by-Step Deployment

#### 1. Prepare Your Environment Variables

Create a `.env` file in your project root with your API key:
```bash
BALLDONTLIE_API_KEY=your_actual_api_key_here
```

#### 2. Deploy to Vercel

**Option A: Using Vercel CLI**
```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (run from project root)
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - Project name: redline (or your preferred name)
# - Directory: ./ (current directory)
# - Override settings? N

# Set environment variables
vercel env add BALLDONTLIE_API_KEY
# Enter your API key when prompted
# Select Production environment

# Deploy to production
vercel --prod
```

**Option B: Using Vercel Dashboard**
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your Git repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Add Environment Variables:
   - Key: `BALLDONTLIE_API_KEY`
   - Value: Your actual API key
6. Click "Deploy"

#### 3. Verify Deployment

After deployment, your app will be available at a URL like `https://your-project-name.vercel.app`

Test the following endpoints to ensure the backend is working:
- `https://your-project-name.vercel.app/api/teams` - Should return NBA teams
- `https://your-project-name.vercel.app/api/players` - Should return NBA players
- `https://your-project-name.vercel.app/api/games` - Should return NBA games

### Architecture

This project uses Vercel's serverless functions for the backend:

- **Frontend**: React app built with Vite, deployed as static files
- **Backend**: Node.js serverless functions in the `/api` directory
- **API**: Proxies requests to the Balldontlie API with authentication

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `BALLDONTLIE_API_KEY` | Your Balldontlie API key | Yes |

### Troubleshooting

**Issue: API calls failing in production**
- Check that environment variables are properly set in Vercel dashboard
- Verify your API key is valid and has sufficient quota
- Check the Vercel function logs in the dashboard

**Issue: Images not loading**
- Ensure images are in the `public/` directory
- Use absolute paths starting with `/` for public assets

**Issue: Build failing**
- Check that all dependencies are listed in `package.json`
- Ensure your code follows ES modules syntax (using `import`/`export`)

### Local Development

To run locally with the backend:

```bash
# Install dependencies for frontend
npm install

# Install dependencies for backend
cd backend
npm install
cd ..

# Start backend server
cd backend
npm start

# In another terminal, start frontend
npm run dev
```

The app will be available at `http://localhost:5173` with the backend at `http://localhost:4000`.

### Custom Domain (Optional)

To use a custom domain:
1. Go to your project settings in Vercel dashboard
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Features

- Browse NBA players with search and pagination
- View team information and rosters
- Check game schedules and results
- Multilingual support (English/French)
- Responsive design
- Modern UI with Tailwind CSS

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, React Router
- **Backend**: Node.js, Express (converted to Vercel serverless functions)
- **API**: Balldontlie NBA API
- **Deployment**: Vercel
- **State Management**: React Query (TanStack Query)
