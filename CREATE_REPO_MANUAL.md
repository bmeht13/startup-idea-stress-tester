# Manual: Create GitHub Repository and Push Code

Follow these steps exactly to push your code to GitHub.

---

## Step 1: Create GitHub Repository

### Via Web Browser (Easiest)

1. Go to **https://github.com/new**
2. Fill in the form:
   - **Repository name:** `startup-idea-stress-tester`
   - **Description:** `Rigorous, critical VC-style startup idea analysis using Claude AI`
   - **Visibility:** Choose "Public" or "Private"
   - **Initialize this repository with:** UNCHECK ALL (README, .gitignore, license)

3. Click **"Create repository"**

### Verify
You'll see a green button or a page that says "Quick setup". The URL will look like:
```
https://github.com/YOUR_USERNAME/startup-idea-stress-tester
```

**Copy this URL** - you'll need it in Step 3.

---

## Step 2: Verify Local Git Repository

Open Terminal and run:

```bash
cd /Users/cube/Documents/ClaudeTest/startup-stress-tester
git status
```

You should see:
```
On branch main
nothing to commit, working tree clean
```

If you see "Changes not staged for commit" or "Untracked files", run:
```bash
git add .
git commit -m "final: prepare for GitHub push"
```

---

## Step 3: Add GitHub Remote

In Terminal, run:

```bash
git remote add origin https://github.com/YOUR_USERNAME/startup-idea-stress-tester.git
```

Replace `YOUR_USERNAME` with your actual GitHub username.

**Example:**
```bash
git remote add origin https://github.com/john-doe/startup-idea-stress-tester.git
```

### Verify
```bash
git remote -v
```

You should see:
```
origin  https://github.com/YOUR_USERNAME/startup-idea-stress-tester.git (fetch)
origin  https://github.com/YOUR_USERNAME/startup-idea-stress-tester.git (push)
```

---

## Step 4: Push Code to GitHub

In Terminal, run:

```bash
git branch -M main
git push -u origin main
```

You'll be prompted to authenticate:
- **Username:** Enter your GitHub username
- **Password:** Enter a **Personal Access Token** (not your password)

### Getting a Personal Access Token

1. Go to **https://github.com/settings/tokens**
2. Click **"Generate new token"** (classic)
3. Check the box for **repo**
4. Scroll to bottom and click **"Generate token"**
5. **Copy the token** (you won't see it again)
6. Paste it when Terminal asks for "Password"

---

## Step 5: Verify Push Was Successful

In Terminal, run:

```bash
git log --oneline | head -5
```

You should see your commits.

Then open your GitHub repository in a browser:
```
https://github.com/YOUR_USERNAME/startup-idea-stress-tester
```

You should see:
- ✅ All your files listed
- ✅ 15 commits in the history
- ✅ README.md displaying

---

## Troubleshooting

### "fatal: 'origin' does not appear to be a 'git' repository"
**Solution:** You ran a command outside the project directory.
```bash
cd /Users/cube/Documents/ClaudeTest/startup-stress-tester
git remote add origin https://...
```

### "fatal: remote origin already exists"
**Solution:** Remote was already added. Use:
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/startup-idea-stress-tester.git
```

### "fatal: Authentication failed"
**Solution:** You used your password instead of a Personal Access Token.
1. Get a token from https://github.com/settings/tokens
2. Try pushing again and paste the token

### "fatal: permission denied"
**Solution:** Check your repository visibility settings and permissions on GitHub.

---

## What's Next?

Your code is now on GitHub! You can:

1. **Share the link:** `https://github.com/YOUR_USERNAME/startup-idea-stress-tester`

2. **Add a collaborator:**
   - Go to Settings → Collaborators
   - Add their GitHub username

3. **Continue developing:**
   ```bash
   git checkout -b feature/new-feature
   # make changes
   git commit -m "feat: description"
   git push -u origin feature/new-feature
   ```

4. **Clone to another machine:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/startup-idea-stress-tester.git
   cd startup-idea-stress-tester
   npm install
   npm run dev
   ```

---

## Commands Summary

```bash
# Navigate to project
cd /Users/cube/Documents/ClaudeTest/startup-stress-tester

# Verify repo is clean
git status

# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/startup-idea-stress-tester.git

# Verify remote
git remote -v

# Push to GitHub
git branch -M main
git push -u origin main

# Verify (after push)
git log --oneline | head -5
```

---

**You're done!** Your code is now safely on GitHub 🎉
