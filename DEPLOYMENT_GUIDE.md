# IntolerSense Landing Page Deployment Guide

## Overview
This guide describes the steps to publish changes to the IntolerSense landing page hosted on GitHub Pages.

## Prerequisites
- Node.js and npm installed
- Git repository cloned locally
- Write access to the GitHub repository

## Deployment Steps

### 1. Make Your Changes
- Edit the necessary files in the `src/` directory
- Test changes locally using `npm run dev`

### 2. Build the Project
```bash
npm run build
```
This creates optimized production files in the `dist/` directory.

### 3. Test the Build (Optional but Recommended)
```bash
npm run preview
```
This serves the built files locally to verify everything works correctly.

### 4. Commit Changes to Main Branch
```bash
git add .
git commit -m "Your descriptive commit message"
git push origin main
```

### 5. Deploy to GitHub Pages
```bash
npm run deploy
```
This command:
- Takes the built files from the `dist/` directory
- Pushes them to the `gh-pages` branch
- Triggers GitHub Pages to update the live site

### 6. Verify Deployment
- Check that the `gh-pages` branch was updated:
  ```bash
  git fetch origin gh-pages
  git log --oneline -2 origin/gh-pages
  ```
- Visit the live site: https://intolersense.github.io/intolersense-landing
- Allow 2-3 minutes for changes to propagate

## Important Notes

- **Always build before deploying**: The `npm run deploy` command deploys whatever is in the `dist/` folder
- **GitHub Pages serves from the `gh-pages` branch**: This is automatically managed by the `gh-pages` package
- **Changes must be committed to main first**: This ensures version control consistency
- **The deployment process is automated**: The `gh-pages` package handles creating and pushing to the deployment branch

## Troubleshooting

### If deployment fails:
1. Ensure you have write permissions to the repository
2. Check that the build completed successfully
3. Verify your local git configuration is correct
4. Try running `git clean -fd` to clean up any build artifacts

### If changes don't appear on the live site:
1. Wait 2-3 minutes for GitHub Pages to update
2. Check the GitHub repository's Pages settings
3. Verify the `gh-pages` branch contains the latest changes
4. Try a hard refresh (Ctrl+F5 or Cmd+Shift+R)

## Quick Reference
```bash
# Complete deployment workflow
npm run build          # Build the project
npm run deploy         # Deploy to GitHub Pages
```

## Repository Structure
```
intolersense-landing/
├── src/                # Source code
├── dist/               # Built files (auto-generated)
├── package.json        # Contains deploy script
└── DEPLOYMENT_GUIDE.md # This file
```

## GitHub Pages Configuration
- **Source**: Deploy from `gh-pages` branch
- **URL**: https://intolersense.github.io/intolersense-landing
- **Custom domain**: Not configured (uses GitHub Pages subdomain)
