# React App Deployment to GitHub Pages

## Complete Step-by-Step Guide

### 1. Project Setup
```bash
# Create React app
npx create-react-app taskflow-app
cd taskflow-app

# Install additional dependencies
npm install lucide-react tailwindcss
```

### 2. Configure Package.json
Add homepage URL to `package.json`:
```json
{
  "name": "taskflow-app",
  "version": "0.1.0",
  "homepage": "https://YOUR_USERNAME.github.io/YOUR_REPO_NAME",
  "private": true,
  ...
}
```

### 3. Create GitHub Actions Workflow
Create `.github/workflows/react.yml`:
```yaml
name: React CI/CD

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build project
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './build'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 4. Create 404.html for SPA Support
Create `public/404.html`:
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>TaskFlow App</title>
    <script type="text/javascript">
      // Single Page Apps for GitHub Pages
      var pathSegmentsToKeep = 1;
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body>
  </body>
</html>
```

### 5. GitHub Repository Setup
1. Create new repository on GitHub
2. Push your code:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### 6. Configure GitHub Pages
1. Go to **Settings** → **Actions** → **General**
2. Under **Workflow permissions**, select **"Read and write permissions"**
3. Check **"Allow GitHub Actions to create and approve pull requests"**
4. Go to **Settings** → **Pages**
5. Under **Source**, select **"GitHub Actions"**

### 7. Deploy
1. Push changes to `main` branch
2. GitHub Actions will automatically:
   - Install dependencies
   - Build the React app
   - Deploy to GitHub Pages
3. Visit: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`

### 8. Troubleshooting

#### Common Issues:
- **Blank page**: Check homepage URL in package.json
- **Permission denied**: Enable workflow permissions in repository settings
- **Build fails**: Fix any linting errors or add CI=false to build step
- **404 errors**: Ensure 404.html is in public folder

#### Build with warnings as errors:
If CI treats warnings as errors, add to workflow:
```yaml
      - name: Build project
        run: CI=false npm run build
```

### 9. Additional Configurations

#### For React Router:
Add basename to your router:
```jsx
<BrowserRouter basename="/YOUR_REPO_NAME">
  <App />
</BrowserRouter>
```

#### Custom Domain:
Add `public/CNAME` file with your domain:
```
yourdomain.com
```

### 10. Verification
- Check Actions tab for successful deployment
- Visit your GitHub Pages URL
- Verify all routes work correctly
- Test on mobile devices

## File Structure
```
project/
├── .github/
│   └── workflows/
│       └── react.yml
├── public/
│   ├── 404.html
│   └── index.html
├── src/
│   └── (your React components)
├── package.json
└── README.md
```

## Useful Commands
```bash
# Test build locally
npm run build
npx serve -s build

# Check for linting issues
npm run lint

# Run tests
npm test
```

This setup provides automatic deployment to GitHub Pages whenever you push to the main branch.