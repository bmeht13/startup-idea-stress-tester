# Git Workflow & Best Practices

This document outlines the professional Git workflow established for the Startup Idea Stress Tester project.

---

## Repository Structure

```
startup-idea-stress-tester/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── page.tsx      # Main page
│   │   ├── layout.tsx
│   │   └── api/          # API routes
│   ├── components/       # React components
│   │   ├── ui/           # Reusable primitives
│   │   ├── sections/     # Analysis sections
│   │   ├── IdeaForm.tsx
│   │   └── ResultsDashboard.tsx
│   ├── lib/              # Business logic
│   │   ├── claude.ts     # AI integration
│   │   ├── prompts.ts    # Claude prompts
│   │   ├── schema.ts     # Validation
│   │   └── utils.ts
│   └── types/            # TypeScript definitions
├── .gitignore            # Ignore patterns
├── .env.example          # Environment template
├── README.md             # Project documentation
├── QUICK_START.md        # Setup guide
├── GITHUB_SETUP.md       # GitHub instructions
├── GIT_WORKFLOW.md       # This file
└── package.json          # Dependencies
```

---

## Commit History Philosophy

This project follows **atomic commits** — each commit represents a single logical change that is:

- **Self-contained** — It stands alone and doesn't depend on unreleased commits
- **Complete** — The entire feature/fix is included, not partial work
- **Testable** — In theory, each commit should compile and pass tests
- **Documented** — The commit message explains why, not just what

### Commit Types

All commits use semantic prefixes for clarity:

| Type | Purpose | Example |
|------|---------|---------|
| `feat` | New feature | `feat: add user authentication` |
| `fix` | Bug fix | `fix: correct score ring color gradient` |
| `refactor` | Code improvement (no feature change) | `refactor: simplify modal logic` |
| `docs` | Documentation | `docs: add deployment guide` |
| `chore` | Maintenance, dependencies | `chore: update typescript version` |
| `test` | Test files | `test: add unit tests for ScoreRing` |
| `perf` | Performance | `perf: optimize API response time` |

### Commit Message Format

**Short commits:**
```
feat: add dark mode toggle

Single-line summary only if change is trivial.
```

**Full commits (preferred):**
```
feat: add dark mode toggle

- Implement theme context provider
- Create DarkModeToggle component
- Add localStorage persistence
- Update all components with theme awareness

This allows users to switch between light and dark themes,
with preference persisted across sessions.

Fixes: #42
```

**Guidelines:**
- First line ≤ 72 characters
- Leave a blank line after summary
- Wrap body at 80 characters
- Be specific about what and why, not how
- Reference related issues with `Fixes: #123` or `Related: #456`

---

## Daily Development Workflow

### Starting New Work

```bash
# Update main branch
git checkout main
git pull origin main

# Create feature branch (optional, but recommended for larger features)
git checkout -b feature/description-of-work
```

### Making Changes

```bash
# Check what changed
git status
git diff

# Stage logical groups (NOT everything at once)
git add src/components/sections/Verdict.tsx
git add src/lib/prompts.ts

# Review staged changes
git diff --staged
```

### Committing

```bash
# Make atomic commit
git commit -m "feat: add verdict banner component

The Verdict component displays the analysis result in a colored banner.
- Green background for 'strong bet'
- Amber background for 'promising but flawed'  
- Red background for 'weak idea'

Also includes primary concern and best case scenario cards."

# If you staged more changes by mistake, unstage:
git reset HEAD <file>
```

### Pushing

```bash
# Push to GitHub
git push origin feature/description

# If it's your first push of the branch:
git push -u origin feature/description
```

---

## Working with Branches

### Feature Branches

Use branches for:
- Large features (multiple commits)
- Experimental work
- Collaborative changes

```bash
# Create and switch to branch
git checkout -b feature/pdf-export

# Make changes and commits
# ... work work work ...

# Push when ready
git push -u origin feature/pdf-export

# Open pull request on GitHub (if team collaboration)
# After review and merge:

git checkout main
git pull origin main
git branch -d feature/pdf-export
git push origin --delete feature/pdf-export
```

### Hotfix Branches

For urgent production fixes:

```bash
git checkout -b hotfix/api-timeout-bug

# Fix the issue and commit
git commit -m "fix: increase API timeout to 60 seconds"

# Push and merge back to main
git push -u origin hotfix/api-timeout-bug
```

### Keeping Updated

While working on a branch, keep it updated with main:

```bash
git fetch origin
git rebase origin/main

# If you have unpushed local commits, use:
git pull --rebase origin main
```

---

## Common Workflows

### Adding a New Feature

```bash
# 1. Create branch
git checkout -b feature/idea-comparison

# 2. Implement feature
# ... create files, write code ...

# 3. Stage and commit (atomically)
git add src/components/ComparisonView.tsx
git commit -m "feat: create comparison view component"

git add src/lib/comparison.ts
git commit -m "feat: add comparison logic"

git add src/types/comparison.ts
git commit -m "feat: add comparison types"

# 4. Push
git push -u origin feature/idea-comparison

# 5. Merge (directly or via PR)
git checkout main
git pull origin main
git merge --no-ff feature/idea-comparison
git push origin main
```

### Fixing a Bug

```bash
# 1. Create branch from main
git checkout -b fix/score-ring-animation

# 2. Identify and fix the issue
# ... modify src/components/ui/ScoreRing.tsx ...

# 3. Commit fix
git commit -m "fix: correct SVG stroke-dashoffset animation

The animation was jumping instead of smoothly transitioning because
strokeDashoffset was using the wrong calculation. Changed from linear
to ease-out timing function."

# 4. Push and merge
git push -u origin fix/score-ring-animation
git checkout main
git pull origin main
git merge --ff-only origin/fix/score-ring-animation
git push origin main
```

### Updating Dependencies

```bash
# Update a package
npm install --save lodash@4.17.21

# Commit
git add package.json package-lock.json
git commit -m "chore: update lodash to 4.17.21

Updated for security patch fixing prototype pollution vulnerability."

git push origin main
```

---

## Review Checklist Before Pushing

✅ **Code Quality**
- Code follows project conventions
- No console.log() statements left
- TypeScript types are correct
- Error handling is present

✅ **Testing**
- Build passes: `npm run build`
- No TypeScript errors: `npm run build`
- Feature works as intended

✅ **Documentation**
- Comments explain non-obvious logic
- README updated if needed
- Commit message is clear

✅ **Git Hygiene**
- Commits are atomic
- Commit messages are descriptive
- No unintended files staged

---

## Handling Mistakes

### Undo Last Commit (Not Yet Pushed)

```bash
# Undo commit, keep changes
git reset --soft HEAD~1

# Undo commit, discard changes
git reset --hard HEAD~1
```

### Undo Last Commit (Already Pushed)

```bash
# Create a new commit that reverts the previous
git revert HEAD
git push origin main
```

### Restore Deleted File

```bash
# See recent commits with file
git log -- src/components/DeletedComponent.tsx

# Restore from specific commit
git checkout <commit-hash> -- src/components/DeletedComponent.tsx
git commit -m "restore: recover DeletedComponent from commit <hash>"
```

### Fix Last Commit Message

```bash
# Only if not yet pushed
git commit --amend -m "new message"

# If already pushed (creates new commit)
git revert HEAD
git commit -m "correct: fix previous message"
```

---

## Merging Strategies

### Fast-Forward Merge (Simple Updates)

```bash
git checkout main
git pull origin main
git merge --ff-only feature/simple-fix
git push origin main
```

### Create Merge Commit (Features)

```bash
git checkout main
git pull origin main
git merge --no-ff feature/large-feature
git push origin main
```

This preserves the branch history and makes it clear when features were integrated.

### Rebase & Merge (Clean History)

```bash
git checkout feature/clean-work
git rebase main

# Resolve any conflicts if needed
git rebase --continue

git checkout main
git merge --ff-only feature/clean-work
git push origin main
```

---

## Collaboration Best Practices

### Before Starting Work

```bash
# Get latest changes from everyone
git fetch origin

# See what changed
git log origin/main --oneline -10

# Update your main branch
git checkout main
git pull origin main
```

### Communicating Changes

Use descriptive commit messages that answer:
- **What** changed?
- **Why** did it change?
- **How** does it affect others?

Example:
```
feat: add caching layer to Claude API responses

Implement memoization with 1-hour TTL to reduce API calls.
Identical analysis requests within the hour will return cached results.

Note: This changes the behavior of /api/analyze endpoint—
same input will now sometimes return slightly stale results.
Migration: No action needed; transparent to users.
```

### Handling Conflicts

```bash
# You see: CONFLICT (content merge)
# Edit the conflicted files and choose correct version

git add src/components/Section.tsx
git commit -m "resolve: merge conflict in Section component"
git push origin main
```

---

## Reviewing History

### View All Commits

```bash
# One line per commit
git log --oneline

# With branch visualization
git log --oneline --graph --all

# With dates and authors
git log --format=medium

# Just this week
git log --since="1 week ago"
```

### Find When Something Changed

```bash
# Blame — see who changed each line
git blame src/components/ui/ScoreRing.tsx

# Search commits by message
git log --grep="animation" --oneline

# Search commits by content
git log -S "strokeDashoffset" --oneline
```

### See What Changed

```bash
# What changed in last commit
git show HEAD

# What changed in specific commit
git show abc123def

# Diff between branches
git diff main feature/new-work

# Diff between commits
git diff abc123 def456
```

---

## Automation & Hooks (Optional)

You can add Git hooks to automate checks:

```bash
# Create .git/hooks/pre-commit to run before commits
# This could run: npm run lint, npm run test, npm run build
```

Example `.git/hooks/pre-commit`:
```bash
#!/bin/sh
set -e

echo "Running pre-commit checks..."
npm run build
npm run lint

echo "✓ All checks passed"
```

---

## Key Takeaways

1. **Atomic Commits** — Each commit is one logical change
2. **Descriptive Messages** — Future you will thank present you
3. **Branch for Features** — Isolate work, keep main clean
4. **Test Before Pushing** — `npm run build` should pass
5. **Push Frequently** — Don't let local changes sit too long
6. **Keep History Clean** — Don't commit debug code or `.env.local`
7. **Communicate Clearly** — Messages help team understanding

---

## Reference Commands

```bash
# Essential daily commands
git status                    # What changed?
git diff                      # Show all changes
git add <file>               # Stage changes
git commit -m "message"      # Commit locally
git push origin main         # Push to GitHub
git pull origin main         # Get latest

# Less common but useful
git log --oneline            # Commit history
git rebase origin/main       # Update branch
git merge --no-ff <branch>   # Create merge commit
git checkout <commit>        # Go back in time
git revert HEAD              # Undo last commit
git reset --soft HEAD~1      # Undo commit, keep changes
```

---

## When in Doubt

```bash
# Never delete untracked files
git clean -n  # Preview what would be deleted
git clean -fd # Actually delete

# Check status before any destructive operation
git status
git log -5    # See recent commits

# If you mess up, check reflog
git reflog    # Shows all local changes
```

---

**This workflow ensures professional version control and makes collaboration seamless.** 🚀
